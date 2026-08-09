import { expect, test } from "@playwright/test";

const coreRoutes = [
  "/",
  "/about",
  "/services",
  "/services/baoyan",
  "/cases",
  "/cases/baoyan",
  "/teachers",
  "/teachers/xu-zhaoyi",
  "/faq",
  "/contact",
];

test("core routes render without client exceptions", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const route of coreRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).not.toContainText(
      "Application error: a client-side exception has occurred",
    );
    await expect(page.locator("h1").first()).toBeVisible();
  }

  expect(pageErrors).toEqual([]);
});

test("mobile navigation has its own scroll range and can open final links", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");

  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "打开全站导航" }).click();

  const menu = page.locator("header .overflow-y-auto");
  await expect(menu).toBeVisible();

  const dimensions = await menu.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }));
  expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.clientHeight);

  await menu.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect
    .poll(() => menu.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);

  const contactLink = menu.locator('a[href="/contact"]');
  await expect(contactLink).toBeVisible();
  await contactLink.click();

  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { name: "预约免费一对一评估", exact: true })).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test("homepage navigation stays usable in a short desktop window", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");

  await page.setViewportSize({ width: 760, height: 420 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "打开全站导航" }).click();

  const menu = page.locator("header .overflow-y-auto");
  await expect(menu).toBeVisible();

  const box = await menu.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(420);

  const dimensions = await menu.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }));
  expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.clientHeight);

  await menu.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect
    .poll(() => menu.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);

  const contactLink = menu.locator('a[href="/contact"]');
  await expect(contactLink).toBeVisible();
});

test("homepage primary CTA remains a normal navigable link", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator('#home a[href="/contact"]').first().click();

  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { name: "预约免费一对一评估", exact: true })).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test("teacher detail navigation does not request missing static payloads", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");

  const missingPayloads: string[] = [];
  page.on("response", (response) => {
    const url = new URL(response.url());
    const isNextPayload =
      url.searchParams.has("_rsc") || url.pathname.includes("/__next.");

    if (response.status() === 404 && isNextPayload) {
      missingPayloads.push(response.url());
    }
  });

  await page.goto("/teachers", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: /徐照宜/ }).first().click();

  await expect(page).toHaveURL(/\/teachers\/xu-zhaoyi$/);
  await expect(page.getByRole("heading", { name: "徐照宜", exact: true }).first()).toBeVisible();
  await page.waitForLoadState("networkidle");

  expect(missingPayloads).toEqual([]);
});

test("theme toggle remains usable without external theme provider", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const root = page.locator("html");
  const toggle = page.getByRole("button", { name: "切换深色模式" });

  await expect(toggle).toBeVisible();
  const wasDark = await root.evaluate((element) => element.classList.contains("dark"));
  await toggle.click();
  await expect
    .poll(() => root.evaluate((element) => element.classList.contains("dark")))
    .toBe(!wasDark);

  expect(pageErrors).toEqual([]);
});
