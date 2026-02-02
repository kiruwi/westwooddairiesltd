"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef, type RefObject } from "react";

type GL = Renderer["gl"];
type RGB = { r: number; g: number; b: number };

const DEFAULT_BG_COLOR = "#fce7f3";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseHexColor(hex: string): RGB | null {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length === 3) {
    const r = parseInt(normalized[0] + normalized[0], 16);
    const g = parseInt(normalized[1] + normalized[1], 16);
    const b = parseInt(normalized[2] + normalized[2], 16);
    return { r, g, b };
  }
  if (normalized.length === 6) {
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function mixRgb(a: RGB, b: RGB, t: number): RGB {
  const clamped = clamp(t, 0, 1);
  return {
    r: Math.round(a.r + (b.r - a.r) * clamped),
    g: Math.round(a.g + (b.g - a.g) * clamped),
    b: Math.round(a.b + (b.b - a.b) * clamped),
  };
}

function shadeRgb(color: RGB, factor: number): RGB {
  return {
    r: Math.round(clamp(color.r * factor, 0, 255)),
    g: Math.round(clamp(color.g * factor, 0, 255)),
    b: Math.round(clamp(color.b * factor, 0, 255)),
  };
}

function lightenRgb(color: RGB, amount: number): RGB {
  return mixRgb(color, { r: 255, g: 255, b: 255 }, amount);
}

function rgbToCss(color: RGB): string {
  return `rgb(${color.r} ${color.g} ${color.b})`;
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string = "bold 30px monospace",
  color: string = "black",
  strokeColor?: string,
  strokeWidth: number = 0
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2d context");

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);

  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;

  context.font = font;
  context.fillStyle = color;
  if (strokeColor && strokeWidth > 0) {
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    context.lineJoin = "round";
  }
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (strokeColor && strokeWidth > 0) {
    context.strokeText(text, canvas.width / 2, canvas.height / 2);
  }
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

interface TitleProps {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
  outlineColor?: string;
  outlineWidth?: number;
}

class Title {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  outlineColor?: string;
  outlineWidth: number;
  mesh!: Mesh;
  baseScaleX: number = 1;
  baseScaleY: number = 1;

  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = "#545050",
    font = "30px sans-serif",
    outlineColor,
    outlineWidth = 0,
  }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.outlineColor = outlineColor;
    this.outlineWidth = outlineWidth;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
      this.outlineColor,
      this.outlineWidth
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.15;
    const textWidthScaled = textHeightScaled * aspect;
    this.baseScaleX = textWidthScaled;
    this.baseScaleY = textHeightScaled;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    const gap = (textHeightScaled * 0.5 + 0.05) * 0.5;
    const baseY = -this.plane.scale.y * 0.5 - gap;
    this.mesh.position.y = baseY + textHeightScaled * 0.2;
    this.mesh.setParent(this.plane);
  }

  setVisible(visible: boolean) {
    if (visible) {
      this.mesh.scale.set(this.baseScaleX, this.baseScaleY, 1);
    } else {
      this.mesh.scale.set(0, 0, 0);
    }
  }
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
  outlineColor?: string;
  outlineWidth?: number;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  font?: string;
  outlineColor?: string;
  outlineWidth?: number;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale!: number;
  baseScaleX!: number;
  baseScaleY!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    outlineColor,
    outlineWidth,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.outlineColor = outlineColor;
    this.outlineWidth = outlineWidth;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const maxAnisotropy = this.renderer.parameters?.maxAnisotropy ?? 0;
    const isMobile = window.innerWidth < 640;
    const anisotropy = maxAnisotropy
      ? Math.min(maxAnisotropy, isMobile ? 4 : 8)
      : 0;
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
      minFilter: this.gl.LINEAR_MIPMAP_LINEAR,
      magFilter: this.gl.LINEAR,
      anisotropy,
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uFocus;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          float wobble = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          p.z = wobble * (1.0 - uFocus);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        varying vec2 vUv;

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          gl_FragColor = vec4(color.rgb, color.a);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uFocus: { value: 0 },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth,
        img.naturalHeight,
      ];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
      outlineColor: this.outlineColor,
      outlineWidth: this.outlineWidth,
    });
  }

  getBaseX(scroll: { current: number }) {
    return this.x - scroll.current - this.extra;
  }

  update(
    scroll: { current: number; last: number },
    direction: "right" | "left",
    isCenter: boolean,
    pushAmount: number
  ) {
    const baseX = this.getBaseX(scroll);
    const focus = isCenter ? 1 : 0;
    const scaleFactor = isCenter ? 1.5 : 1;
    this.plane.scale.x = this.baseScaleX * scaleFactor;
    this.plane.scale.y = this.baseScaleY * scaleFactor;
    this.plane.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
    const push = isCenter ? 0 : Math.sign(baseX) * pushAmount;
    this.plane.position.x = baseX + push;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    this.program.uniforms.uFocus.value = focus;
    this.title.setVisible(isCenter);

    const planeOffset = this.baseScaleX / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = baseX + planeOffset < -viewportOffset;
    this.isAfter = baseX - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [
          this.viewport.width,
          this.viewport.height,
        ];
      }
    }
    this.scale = this.screen.height / 1500;
    const isMobile = this.screen.width < 640;
    const sizeScale = isMobile ? 0.72 : 0.84;
    this.plane.scale.y =
      (this.viewport.height * (900 * this.scale) * sizeScale) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (700 * this.scale) * sizeScale) / this.screen.width;
    this.baseScaleX = this.plane.scale.x;
    this.baseScaleY = this.plane.scale.y;
    this.plane.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface GalleryItem {
  image: string;
  text: string;
  color?: string;
}

interface AppConfig {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  backgroundTarget?: HTMLElement | null;
  overlayTarget?: HTMLElement | null;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  touchStartX: number = 0;
  touchStartY: number = 0;
  touchStartTime: number = 0;
  isTouchingCarousel: boolean = false;
  allowScroll: boolean = false;
  exitLockMs: number = 450;
  exitSwipeThreshold: number = 28;
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: { image: string; text: string }[] = [];
  palette: RGB[] = [];
  backgroundTarget?: HTMLElement | null;
  overlayTarget?: HTMLElement | null;
  lastBackground: string | null = null;
  lastCenterIndex: number = -1;
  overlayRotation: number = 0;
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;
  isRunning: boolean = false;
  idleFrames: number = 0;
  boundUpdate!: () => void;

  boundOnResize!: () => void;
  boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;
  touchMoveOptions: AddEventListenerOptions = { passive: false };

  isDown: boolean = false;
  start: number = 0;

  getTargetDpr() {
    const deviceDpr = window.devicePixelRatio || 1;
    const isMobile = window.innerWidth < 640;
    const maxDpr = isMobile ? 1.6 : 2;
    return Math.min(deviceDpr, maxDpr);
  }

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = "#ffffff",
      borderRadius = 0,
      font = 'bold 30px "SuperWoobly"',
      scrollSpeed = 2,
      scrollEase = 0.05,
      backgroundTarget = null,
      overlayTarget = null,
    }: AppConfig
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.backgroundTarget = backgroundTarget;
    this.overlayTarget = overlayTarget;
    this.boundUpdate = this.update.bind(this);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.startLoop();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: this.getTargetDpr(),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 20,
      widthSegments: 40,
    });
  }

  createMedias(
    items: GalleryItem[] | undefined,
    bend: number = 1,
    textColor: string,
    borderRadius: number,
    font: string
  ) {
    const defaultItems: GalleryItem[] = [
      {
        image: "https://picsum.photos/seed/1/800/600?grayscale",
        text: "Bridge",
      },
      {
        image: "https://picsum.photos/seed/2/800/600?grayscale",
        text: "Desk Setup",
      },
      {
        image: "https://picsum.photos/seed/3/800/600?grayscale",
        text: "Waterfall",
      },
      {
        image: "https://picsum.photos/seed/4/800/600?grayscale",
        text: "Strawberries",
      },
      {
        image: "https://picsum.photos/seed/5/800/600?grayscale",
        text: "Deep Diving",
      },
      {
        image: "https://picsum.photos/seed/16/800/600?grayscale",
        text: "Train Track",
      },
      {
        image: "https://picsum.photos/seed/17/800/600?grayscale",
        text: "Santorini",
      },
      {
        image: "https://picsum.photos/seed/8/800/600?grayscale",
        text: "Blurry Lights",
      },
      {
        image: "https://picsum.photos/seed/9/800/600?grayscale",
        text: "New York",
      },
      {
        image: "https://picsum.photos/seed/10/800/600?grayscale",
        text: "Good Boy",
      },
      {
        image: "https://picsum.photos/seed/21/800/600?grayscale",
        text: "Coastline",
      },
      {
        image: "https://picsum.photos/seed/12/800/600?grayscale",
        text: "Palm Trees",
      },
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    const fallbackColor = parseHexColor(DEFAULT_BG_COLOR) ?? { r: 252, g: 231, b: 243 };
    this.palette = galleryItems.map((item) => {
      const parsed = item.color ? parseHexColor(item.color) : null;
      return parsed ?? fallbackColor;
    });
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      const itemColor = galleryItems[index % galleryItems.length]?.color;
      const resolvedTextColor = "#ffffff";
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor: resolvedTextColor,
        outlineColor: itemColor ?? textColor,
        outlineWidth: 4,
        borderRadius,
        font,
      });
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    const target = e.target as Node | null;
    if (target && !this.container.contains(target)) return;
    this.isDown = true;
    this.isTouchingCarousel = true;
    this.allowScroll = false;
    this.scroll.position = this.scroll.current;
    if ("touches" in e) {
      this.touchStartX = e.touches[0]?.clientX ?? 0;
      this.touchStartY = e.touches[0]?.clientY ?? 0;
      this.touchStartTime = performance.now();
      this.start = this.touchStartX;
    } else {
      this.start = e.clientX;
    }
    this.startLoop();
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const isTouch = "touches" in e;
    const x = isTouch ? e.touches[0]?.clientX ?? 0 : e.clientX;
    const y = isTouch ? e.touches[0]?.clientY ?? 0 : 0;
    if (isTouch && this.isTouchingCarousel) {
      const dx = x - this.touchStartX;
      const dy = y - this.touchStartY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const timeSinceStart = performance.now() - this.touchStartTime;
      const isVertical = absDy > absDx && absDy > 10;
      const wantsExit = dy > 0 && absDy > this.exitSwipeThreshold;
      if (this.allowScroll) return;
      if (isVertical && wantsExit && timeSinceStart > this.exitLockMs) {
        this.allowScroll = true;
        this.isDown = false;
        this.isTouchingCarousel = false;
        return;
      }
      if (isVertical) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (e.cancelable) e.preventDefault();
    }
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
    this.startLoop();
  }

  onTouchUp() {
    this.isDown = false;
    this.isTouchingCarousel = false;
    this.allowScroll = false;
    this.onCheck();
    this.startLoop();
  }

  onWheel(e: Event) {
    const wheelEvent = e as WheelEvent;
    const delta =
      wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
    this.startLoop();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    const dpr = this.getTargetDpr();
    if (this.renderer.dpr !== dpr) {
      this.renderer.dpr = dpr;
    }
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
    this.startLoop();
  }

  startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.raf = window.requestAnimationFrame(this.boundUpdate);
  }

  update() {
    if (!this.isRunning) return;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      let centerIndex = 0;
      let secondIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;
      let secondDistance = Number.POSITIVE_INFINITY;
      this.medias.forEach((media, index) => {
        const dist = Math.abs(media.getBaseX(this.scroll));
        if (dist < minDistance) {
          secondDistance = minDistance;
          secondIndex = centerIndex;
          minDistance = dist;
          centerIndex = index;
        } else if (dist < secondDistance) {
          secondDistance = dist;
          secondIndex = index;
        }
      });
    const centerScale = this.screen.width < 640 ? 1.25 : 1.4;
      const baseScaleX = this.medias[centerIndex]?.baseScaleX ?? this.medias[0]?.baseScaleX ?? 0;
      const pushAmount = (centerScale - 1) * baseScaleX * 0.6;
      this.medias.forEach((media, index) =>
        media.update(this.scroll, direction, index === centerIndex, pushAmount)
      );
      if (centerIndex !== this.lastCenterIndex) {
        this.overlayRotation = (this.overlayRotation + 90) % 360;
        if (this.overlayTarget) {
          this.overlayTarget.style.transform = `rotate(${this.overlayRotation}deg) scale(1.3)`;
        }
        this.lastCenterIndex = centerIndex;
      }
      this.updateBackground(centerIndex, secondIndex, minDistance, secondDistance);
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    const delta = Math.abs(this.scroll.target - this.scroll.current);
    const speed = Math.abs(this.scroll.current - this.scroll.last);
    const isActive = this.isDown || delta > 0.001 || speed > 0.001;
    if (isActive) {
      this.idleFrames = 0;
    } else {
      this.idleFrames += 1;
    }
    if (this.idleFrames > 60) {
      this.isRunning = false;
      this.scroll.last = this.scroll.current;
      return;
    }
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.boundUpdate);
  }

  updateBackground(
    centerIndex: number,
    secondIndex: number,
    minDistance: number,
    secondDistance: number
  ) {
    if (!this.palette.length) return;
    const width = this.medias[0]?.width || 1;
    const total = minDistance + secondDistance;
    let t = total > 0 ? minDistance / total : 0;
    if (minDistance < width * 0.1) {
      t = 0;
    } else {
      t = Math.pow(t, 1.6);
    }
    const i0 = centerIndex % this.palette.length;
    const i1 = secondIndex % this.palette.length;
    const center = mixRgb(this.palette[i0], this.palette[i1], t);
    const edgeMid = shadeRgb(center, 0.75);
    const edgeOuter = shadeRgb(center, 0.6);
    const gradient = `radial-gradient(circle at center, ${rgbToCss(
      center
    )} 0%, ${rgbToCss(edgeMid)} 70%, ${rgbToCss(edgeOuter)} 100%)`;
    const target = this.backgroundTarget ?? this.container;
    if (this.lastBackground !== gradient) {
      target.style.background = gradient;
      this.lastBackground = gradient;
    }
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("mousewheel", this.boundOnWheel);
    window.addEventListener("wheel", this.boundOnWheel);
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown, { passive: true });
    window.addEventListener("touchmove", this.boundOnTouchMove, this.touchMoveOptions);
    window.addEventListener("touchend", this.boundOnTouchUp, { passive: true });
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousewheel", this.boundOnWheel);
    window.removeEventListener("wheel", this.boundOnWheel);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove, this.touchMoveOptions);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(
        this.renderer.gl.canvas as HTMLCanvasElement
      );
    }
  }
}

interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  backgroundTargetRef?: RefObject<HTMLElement | null>;
  overlayTargetRef?: RefObject<HTMLElement | null>;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = 'bold 30px "SuperWoobly"',
  scrollSpeed = 2,
  scrollEase = 0.05,
  backgroundTargetRef,
  overlayTargetRef,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let app: App | null = null;

    const start = async () => {
      if (!containerRef.current) return;
      if (document.fonts && font) {
        try {
          await document.fonts.load(font);
          await document.fonts.ready;
        } catch {
          // Font load is best-effort; continue with fallback.
        }
      }
      if (!isMounted || !containerRef.current) return;
      app = new App(containerRef.current, {
        items,
        bend,
        textColor,
        borderRadius,
        font,
        scrollSpeed,
        scrollEase,
        backgroundTarget: backgroundTargetRef?.current ?? null,
        overlayTarget: overlayTargetRef?.current ?? null,
      });
    };

    start();
    return () => {
      isMounted = false;
      if (app) app.destroy();
    };
  }, [
    items,
    bend,
    textColor,
    borderRadius,
    font,
    scrollSpeed,
    scrollEase,
    backgroundTargetRef,
    overlayTargetRef,
  ]);

  return (
    <div
      className="h-full w-full overflow-hidden cursor-grab active:cursor-grabbing"
      ref={containerRef}
    />
  );
}
