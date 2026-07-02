import fs from "node:fs";
import path from "node:path";
import { withBasePath } from "@/lib/site";

export type CaseCategory =
  | "baoyan"
  | "study-abroad"
  | "phd-application"
  | "career-coaching";

export type CaseImageRatio = "portrait" | "landscape";

type AdmissionVisual = {
  unit: string;
  image: string;
  keywords: string[];
};

export type StudentCase = {
  id: string;
  category: CaseCategory;
  title: string;
  studentLabel: string;
  background: string;
  challenge: string;
  service: string;
  result: string;
  tags: string[];
  initialSummary?: string;
  outcomeSummary?: string;
  admissionUnit?: string;
  admissionImage?: string;
  contentStatus?: string;
  image?: string;
  imageFile?: string;
  imageRatio?: CaseImageRatio;
  sourceNumber?: string;
  sourceDocument?: string;
  featured?: boolean;
  displayOrder?: number;
};

type RawFrontmatter = Record<string, string | string[] | undefined>;

const categoryOrder: Record<CaseCategory, number> = {
  baoyan: 1,
  "study-abroad": 2,
  "phd-application": 3,
  "career-coaching": 4,
};

const caseCategories: CaseCategory[] = [
  "baoyan",
  "study-abroad",
  "phd-application",
  "career-coaching",
];

const admissionVisuals: AdmissionVisual[] = [
  {
    unit: "清华大学",
    image: "/images/case/tschinghua university.jpg",
    keywords: ["清华大学", "清华", "Tsinghua"],
  },
  {
    unit: "北京大学",
    image: "/images/case/peiking university.jpg",
    keywords: ["北京大学", "北大", "Peking University"],
  },
  {
    unit: "上海交通大学",
    image: "/images/case/shanghai jiaotong university.jpg",
    keywords: ["上海交通大学", "上海交大", "上交", "Shanghai Jiao Tong"],
  },
  {
    unit: "浙江大学",
    image: "/images/case/zhejiang university.jpg",
    keywords: ["浙江大学", "浙大", "Zhejiang University"],
  },
  {
    unit: "哈尔滨工业大学",
    image: "/images/case/haerbinggongye university.jpg",
    keywords: ["哈尔滨工业大学", "哈工大", "哈工深", "哈尔滨工业大学深圳"],
  },
  {
    unit: "中国科学院微电子研究所",
    image: "/images/case/zhongguokexueyuanweidianziyanjiusuo.jpg",
    keywords: ["中国科学院微电子研究所", "中科院微电子", "国科大微电子"],
  },
];

function getCasesRoot() {
  const canonicalRoot = path.join(process.cwd(), "content", "cases");
  const temporaryRoot = path.join(
    process.cwd(),
    "jiuchen-case-markdown",
    "content",
    "cases",
  );

  if (fs.existsSync(canonicalRoot)) {
    return canonicalRoot;
  }

  return temporaryRoot;
}

function isCaseCategory(value: string): value is CaseCategory {
  return caseCategories.includes(value as CaseCategory);
}

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return readMarkdownFiles(fullPath);
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      return [fullPath];
    }

    return [];
  });
}

function cleanScalar(value: string) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseMarkdown(markdown: string) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return {
      frontmatter: {} as RawFrontmatter,
      body: markdown,
    };
  }

  const frontmatterBlock = match[1];
  const body = markdown.slice(match[0].length);
  const frontmatter: RawFrontmatter = {};
  let currentArrayKey: string | undefined;

  frontmatterBlock.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return;
    }

    if (trimmed.startsWith("- ") && currentArrayKey) {
      const currentValue = frontmatter[currentArrayKey];
      const item = cleanScalar(trimmed.slice(2));

      if (Array.isArray(currentValue)) {
        currentValue.push(item);
      } else {
        frontmatter[currentArrayKey] = [item];
      }

      return;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!value) {
      frontmatter[key] = [];
      currentArrayKey = key;
      return;
    }

    frontmatter[key] = cleanScalar(value);
    currentArrayKey = key;
  });

  return {
    frontmatter,
    body,
  };
}

function getString(frontmatter: RawFrontmatter, key: string) {
  const value = frontmatter[key];

  if (Array.isArray(value)) {
    return value.join("、").trim();
  }

  return value?.trim() ?? "";
}

function getStringArray(frontmatter: RawFrontmatter, key: string) {
  const value = frontmatter[key];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (value) {
    return [value];
  }

  return [];
}

function getBoolean(frontmatter: RawFrontmatter, key: string) {
  return getString(frontmatter, key) === "true";
}

function getNumber(frontmatter: RawFrontmatter, key: string) {
  const value = Number(getString(frontmatter, key));

  return Number.isFinite(value) ? value : undefined;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeSummary(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function getSection(body: string, title: string) {
  const pattern = new RegExp(
    `^##\\s+${escapeRegExp(title)}\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n##\\s+|$)`,
    "m",
  );

  const match = body.match(pattern);

  return normalizeSummary(match?.[1] ?? "");
}

function getFirstSection(body: string, titles: string[]) {
  for (const title of titles) {
    const section = getSection(body, title);

    if (section) {
      return section;
    }
  }

  return "";
}

function normalizeImagePath(imagePath: string) {
  if (!imagePath) {
    return undefined;
  }

  return withBasePath(imagePath);
}

function normalizeImageRatio(value: string): CaseImageRatio | undefined {
  if (value === "portrait" || value === "landscape") {
    return value;
  }

  return undefined;
}

function findLastKeywordIndex(source: string, keywords: string[]) {
  return keywords.reduce((latestIndex, keyword) => {
    const currentIndex = source.lastIndexOf(keyword);

    return currentIndex > latestIndex ? currentIndex : latestIndex;
  }, -1);
}

function resolveAdmissionVisual(result: string):
  | {
      unit: string;
      image: string;
    }
  | undefined {
  const normalizedResult = normalizeSummary(result);

  if (!normalizedResult) {
    return undefined;
  }

  let matchedVisual: AdmissionVisual | undefined;
  let latestIndex = -1;

  admissionVisuals.forEach((visual) => {
    const currentIndex = findLastKeywordIndex(normalizedResult, visual.keywords);

    if (currentIndex > latestIndex) {
      matchedVisual = visual;
      latestIndex = currentIndex;
    }
  });

  if (!matchedVisual) {
    return undefined;
  }

  return {
    unit: matchedVisual.unit,
    image: withBasePath(matchedVisual.image),
  };
}

function getSourceSortValue(sourceNumber?: string) {
  if (!sourceNumber) {
    return 9999;
  }

  const digits = sourceNumber.match(/\d+/g)?.join("");

  return digits ? Number(digits) : 9999;
}

function parseCaseFile(filePath: string): StudentCase | undefined {
  const markdown = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseMarkdown(markdown);

  const category = getString(frontmatter, "category");

  if (!isCaseCategory(category)) {
    return undefined;
  }

  const id = getString(frontmatter, "id");
  const title = getString(frontmatter, "title");

  if (!id || !title) {
    return undefined;
  }

  const imagePath = getString(frontmatter, "image");
  const imageRatio = normalizeImageRatio(getString(frontmatter, "imageRatio"));
  const background = getFirstSection(body, [
    "学员背景",
    "背景情况",
    "基本背景",
  ]);
  const challenge = getFirstSection(body, [
    "初始情况",
    "初始问题",
    "申请难点",
    "问题分析",
  ]);
  const service = getFirstSection(body, ["服务过程", "服务内容", "规划过程"]);
  const result =
    getString(frontmatter, "result") ||
    getFirstSection(body, ["最终结果", "结果", "录取结果"]);
  const initialSummary =
    getString(frontmatter, "initialSummary") || challenge || background;
  const outcomeSummary = getString(frontmatter, "outcomeSummary") || result;
  const explicitAdmissionImage = getString(frontmatter, "admissionImage");
  const explicitAdmissionUnit = getString(frontmatter, "admissionUnit");
  const resolvedAdmissionVisual = explicitAdmissionImage
    ? {
        unit: explicitAdmissionUnit || title,
        image: withBasePath(explicitAdmissionImage),
      }
    : resolveAdmissionVisual(result || outcomeSummary || title);

  return {
    id,
    category,
    title,
    studentLabel: getString(frontmatter, "studentLabel"),
    background,
    challenge,
    service,
    result,
    tags: getStringArray(frontmatter, "tags"),
    initialSummary,
    outcomeSummary,
    admissionUnit: resolvedAdmissionVisual?.unit,
    admissionImage: resolvedAdmissionVisual?.image,
    contentStatus: getString(frontmatter, "contentStatus") || undefined,
    image: normalizeImagePath(imagePath),
    imageFile: getString(frontmatter, "imageFile") || undefined,
    imageRatio,
    sourceNumber: getString(frontmatter, "sourceNumber") || undefined,
    sourceDocument: getString(frontmatter, "sourceDocument") || undefined,
    featured: getBoolean(frontmatter, "featured"),
    displayOrder: getNumber(frontmatter, "displayOrder"),
  };
}

function loadStudentCases() {
  const casesRoot = getCasesRoot();

  return readMarkdownFiles(casesRoot)
    .map(parseCaseFile)
    .filter((item): item is StudentCase => Boolean(item))
    .sort((a, b) => {
      const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];

      if (categoryDiff !== 0) {
        return categoryDiff;
      }

      const orderA = a.displayOrder ?? getSourceSortValue(a.sourceNumber);
      const orderB = b.displayOrder ?? getSourceSortValue(b.sourceNumber);

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.id.localeCompare(b.id, "zh-Hans-CN", {
        numeric: true,
      });
    });
}

export const studentCases: StudentCase[] = loadStudentCases();

export function getCasesByCategory(category: CaseCategory) {
  return studentCases.filter((item) => item.category === category);
}
