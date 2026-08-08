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
