import { getCasesByCategory, studentCases, type CaseCategory, type StudentCase } from "@/data/cases";
import { casePages, getCasePage, getServicePage, servicePages, type RoutePage } from "@/data/routePages";
import { getServiceDetail, serviceDetails, type ServiceDetail } from "@/data/services";
import { detailedTeachers, getDetailedTeacherById, type TeacherDetail } from "@/data/teacherDetails";
import { featuredTeachers, teachers, type Teacher } from "@/data/teachers";

export type ServiceContent = { page: RoutePage; detail: ServiceDetail };
export type TeacherContent = { teacher: Teacher; detail: TeacherDetail };

export interface ContentRepository {
  listServices(): Promise<ServiceContent[]>;
  listServicePages(): Promise<RoutePage[]>;
  getService(slug: string): Promise<ServiceContent | undefined>;
  listCasePages(): Promise<RoutePage[]>;
  getCasePage(slug: string): Promise<RoutePage | undefined>;
  getCasesByCategory(category: CaseCategory): Promise<StudentCase[]>;
  listCases(): Promise<StudentCase[]>;
  listTeachers(): Promise<Teacher[]>;
  listFeaturedTeachers(): Promise<Teacher[]>;
  listDetailedTeachers(): Promise<Teacher[]>;
  getDetailedTeacher(id: string): Promise<TeacherContent | undefined>;
}

export const contentRepository: ContentRepository = {
  async listServices() {
    return serviceDetails
      .map((detail) => {
        const page = getServicePage(detail.slug);
        return page ? { page, detail } : undefined;
      })
      .filter((item): item is ServiceContent => Boolean(item));
  },
  async listServicePages() {
    return servicePages;
  },
  async getService(slug) {
    const page = getServicePage(slug);
    const detail = getServiceDetail(slug);
    return page && detail ? { page, detail } : undefined;
  },
  async listCasePages() {
    return casePages;
  },
  async getCasePage(slug) {
    return getCasePage(slug);
  },
  async getCasesByCategory(category) {
    return getCasesByCategory(category);
  },
  async listCases() {
    return studentCases;
  },
  async listTeachers() {
    return teachers;
  },
  async listFeaturedTeachers() {
    return featuredTeachers;
  },
  async listDetailedTeachers() {
    return detailedTeachers;
  },
  async getDetailedTeacher(id) {
    return getDetailedTeacherById(id);
  },
};
