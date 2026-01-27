"use client";

import { useMemo, useState, type FormEvent } from "react";
import styles from "../AdminPage.module.css";

type CategoryNode = {
  id: number;
  name: string;
  children: CategoryNode[];
};

type CategoryTreeResponse = {
  categories: CategoryNode[];
};

type CreatePayload = {
  name: string;
  slug: string;
  parentId: number | null;
};

type CategoriesClientProps = {
  initialCategories: CategoryNode[];
  initialError: string | null;
};

function renderTree(nodes: CategoryNode[], depth = 0): JSX.Element[] {
  return nodes.flatMap((node) => {
    const rows = [
      <div
        key={node.id}
        className={styles.treeRow}
        style={{ paddingLeft: depth * 16 }}
      >
        <span className={styles.treeDot} />
        {node.name}
      </div>
    ];

    if (node.children.length > 0) {
      rows.push(...renderTree(node.children, depth + 1));
    }

    return rows;
  });
}

function flattenTree(
  nodes: CategoryNode[],
  depth = 0
): { id: number; name: string }[] {
  return nodes.flatMap((node) => {
    const indent = depth > 0 ? `${"..".repeat(depth)} ` : "";
    const row = { id: node.id, name: `${indent}${node.name}` };
    return [row, ...flattenTree(node.children, depth + 1)];
  });
}

export default function CategoriesClient({
  initialCategories,
  initialError
}: CategoriesClientProps) {
  const [categories, setCategories] = useState<CategoryNode[]>(initialCategories);
  const [treeError, setTreeError] = useState<string | null>(initialError);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const flatOptions = useMemo(() => flattenTree(categories), [categories]);

  async function refreshTree() {
    const response = await fetch("/api/categories/tree");
    if (!response.ok) {
      throw new Error(`Failed to reload categories: ${response.status}`);
    }
    const data = (await response.json()) as CategoryTreeResponse;
    setCategories(Array.isArray(data.categories) ? data.categories : []);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setSuccess(null);

    const payload: CreatePayload = {
      name: name.trim(),
      slug: slug.trim(),
      parentId
    };

    if (!payload.name || !payload.slug) {
      setSubmitError("Name and slug are required.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Failed to create category: ${response.status}`);
      }

      await refreshTree();
      setName("");
      setSlug("");
      setParentId(null);
      setSuccess("Category created.");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create category."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.twoColumn}>
      <div className={`${styles.panel} card`}>
        <div className={styles.panelHeader}>
          <h2>Category tree</h2>
          {treeError ? <span className="badge">API error</span> : null}
        </div>
        <div className={styles.placeholderTree}>
          {treeError ? (
            <div className={styles.treeRow}>{treeError}</div>
          ) : categories.length === 0 ? (
            <div className={styles.treeRow}>No categories yet.</div>
          ) : (
            renderTree(categories)
          )}
        </div>
      </div>

      <div className={`${styles.panel} card`}>
        <div className={styles.panelHeader}>
          <h2>Create category</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            Name
            <input
              className="input"
              placeholder="Category name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className={styles.field}>
            Slug
            <input
              className="input"
              placeholder="category-slug"
              type="text"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
            />
          </label>
          <label className={styles.field}>
            Parent ID
            <select
              className="input"
              value={parentId ?? ""}
              onChange={(event) => {
                const raw = event.target.value;
                setParentId(raw ? Number(raw) : null);
              }}
            >
              <option value="">No parent</option>
              {flatOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.actionRow}>
            {submitError ? (
              <span className="muted">{submitError}</span>
            ) : success ? (
              <span className="muted">{success}</span>
            ) : (
              <span className="muted">Ready to create</span>
            )}
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save category"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
