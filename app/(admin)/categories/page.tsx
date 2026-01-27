import { cookies } from "next/headers";
import CategoriesClient from "./CategoriesClient";
import styles from "../AdminPage.module.css";

type CategoryNode = {
  id: number;
  name: string;
  children: CategoryNode[];
};

type CategoryTreeResponse = {
  categories: CategoryNode[];
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.buzzcut-season.ru";

async function fetchCategoryTree() {
  const token = cookies().get("admin_token")?.value;
  const response = await fetch(`${API_BASE_URL}/api/v1/categories/tree`, {
    cache: "no-store",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });

  if (!response.ok) {
    throw new Error(`Failed to load categories: ${response.status}`);
  }

  const data = (await response.json()) as CategoryTreeResponse;
  return Array.isArray(data.categories) ? data.categories : [];
}

export default async function CategoriesPage() {
  let categories: CategoryNode[] = [];
  let errorMessage: string | null = null;

  try {
    categories = await fetchCategoryTree();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load categories.";
  }

  return (
    <>
      <section className={`${styles.pageHeader} card`}>
        <div>
          <span className="badge">Categories</span>
          <h1>Category tree</h1>
          <p>
            Maintain the hierarchy and create new categories.
          </p>
        </div>
      </section>

      <CategoriesClient
        initialCategories={categories}
        initialError={errorMessage}
      />
    </>
  );
}
