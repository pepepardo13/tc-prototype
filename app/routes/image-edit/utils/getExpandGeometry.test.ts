import { describe, expect, it } from "vitest";

import { type ExpandGeometry, getExpandGeometry } from "./getExpandGeometry.ts";

describe("getExpandGeometry", () => {
  const dim = (w: number, h: number) => ({ width: w, height: h });

  it("returns null when dimensions are null", () => {
    expect(getExpandGeometry(null, null)).toBeNull();
    expect(
      getExpandGeometry(null, {
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
      }),
    ).toBeNull();
  });

  it("returns null when selection is null", () => {
    expect(getExpandGeometry(dim(800, 600), null)).toBeNull();
  });

  it("returns null when width or height is zero or negative", () => {
    const sel = {
      left: 0,
      top: 0,
      right: 100,
      bottom: 50,
      width: 100,
      height: 50,
    };
    expect(getExpandGeometry(dim(0, 100), sel)).toBeNull();
    expect(getExpandGeometry(dim(100, 0), sel)).toBeNull();
    expect(getExpandGeometry(dim(-1, 100), sel)).toBeNull();
  });

  it("returns null when selection is full-frame (no space to expand)", () => {
    expect(
      getExpandGeometry(dim(800, 600), {
        left: 0,
        top: 0,
        right: 800,
        bottom: 600,
        width: 800,
        height: 600,
      }),
    ).toBeNull();
  });

  it("returns null when selection is invalid (zero or reversed)", () => {
    expect(
      getExpandGeometry(dim(100, 100), {
        left: 10,
        top: 10,
        right: 10,
        bottom: 10,
        width: 0,
        height: 0,
      }),
    ).toBeNull();
    expect(
      getExpandGeometry(dim(100, 100), {
        left: 50,
        top: 50,
        right: 40,
        bottom: 40,
        width: -10,
        height: -10,
      }),
    ).toBeNull();
  });

  it("expands in all directions when selection has space on every side", () => {
    const got = getExpandGeometry(dim(100, 100), {
      left: 10,
      top: 20,
      right: 90,
      bottom: 80,
      width: 80,
      height: 60,
    });
    expect(got).not.toBeNull();
    const g = got as ExpandGeometry;
    expect(g.canvasSize).toEqual([120, 140]);
    expect(g.originalImageSize).toEqual([100, 100]);
    expect(g.originalImageLocation).toEqual([10, 20]);
  });

  it("expands right only when selection is pinned left", () => {
    const got = getExpandGeometry(dim(200, 100), {
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
    });
    expect(got).not.toBeNull();
    const g = got as ExpandGeometry;
    expect(g.canvasSize).toEqual([300, 100]);
    expect(g.originalImageSize).toEqual([200, 100]);
    expect(g.originalImageLocation).toEqual([0, 0]);
  });

  it("expands left and above when selection is in bottom-right", () => {
    const got = getExpandGeometry(dim(100, 100), {
      left: 40,
      top: 40,
      right: 100,
      bottom: 100,
      width: 60,
      height: 60,
    });
    expect(got).not.toBeNull();
    const g = got as ExpandGeometry;
    expect(g.canvasSize).toEqual([140, 140]);
    expect(g.originalImageSize).toEqual([100, 100]);
    expect(g.originalImageLocation).toEqual([40, 40]);
  });

  it("produces geometry when selection extends past image (expand right)", () => {
    const got = getExpandGeometry(dim(800, 600), {
      left: 0,
      top: 0,
      right: 1200,
      bottom: 600,
      width: 1200,
      height: 600,
    });
    expect(got).not.toBeNull();
    const g = got as ExpandGeometry;
    expect(g.canvasSize).toEqual([1200, 600]);
    expect(g.originalImageSize).toEqual([800, 600]);
    expect(g.originalImageLocation).toEqual([0, 0]);
  });

  it("produces geometry when selection extends past image (right and bottom)", () => {
    const got = getExpandGeometry(dim(100, 100), {
      left: 0,
      top: 0,
      right: 150,
      bottom: 130,
      width: 150,
      height: 130,
    });
    expect(got).not.toBeNull();
    const g = got as ExpandGeometry;
    expect(g.canvasSize).toEqual([150, 130]);
    expect(g.originalImageSize).toEqual([100, 100]);
    expect(g.originalImageLocation).toEqual([0, 0]);
  });

  it("produces geometry when selection extends past image (expand left)", () => {
    const got = getExpandGeometry(dim(800, 600), {
      left: -200,
      top: 0,
      right: 800,
      bottom: 600,
      width: 1000,
      height: 600,
    });
    expect(got).not.toBeNull();
    const g = got as ExpandGeometry;
    expect(g.canvasSize).toEqual([1000, 600]);
    expect(g.originalImageSize).toEqual([800, 600]);
    expect(g.originalImageLocation).toEqual([200, 0]);
  });

  it("produces geometry when selection extends past image (expand left and top)", () => {
    const got = getExpandGeometry(dim(100, 100), {
      left: -50,
      top: -30,
      right: 100,
      bottom: 100,
      width: 150,
      height: 130,
    });
    expect(got).not.toBeNull();
    const g = got as ExpandGeometry;
    expect(g.canvasSize).toEqual([150, 130]);
    expect(g.originalImageSize).toEqual([100, 100]);
    expect(g.originalImageLocation).toEqual([50, 30]);
  });

  it("clamps canvas to 5000 max side and scales geometry consistently", () => {
    const got = getExpandGeometry(dim(3000, 3000), {
      left: 0,
      top: 0,
      right: 3000,
      bottom: 2000,
      width: 3000,
      height: 2000,
    });
    expect(got).not.toBeNull();
    const g = got as ExpandGeometry;
    const [cw, ch] = g.canvasSize;
    const [ow, oh] = g.originalImageSize;
    const [ox, oy] = g.originalImageLocation;
    expect(cw).toBeLessThanOrEqual(5000);
    expect(ch).toBeLessThanOrEqual(5000);
    expect(ox).toBeGreaterThanOrEqual(0);
    expect(oy).toBeGreaterThanOrEqual(0);
    expect(ox + ow).toBeLessThanOrEqual(cw);
    expect(oy + oh).toBeLessThanOrEqual(ch);
    expect(ow).toBeGreaterThanOrEqual(1);
    expect(oh).toBeGreaterThanOrEqual(1);
  });
});
