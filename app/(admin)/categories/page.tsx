import styles from "../AdminPage.module.css";

export default function CategoriesPage() {
  return (
    <>
      <section className={`${styles.pageHeader} card`}>
        <div>
          <span className="badge">Categories</span>
          <h1>Category tree</h1>
          <p>
            Maintain the hierarchy and create new categories. Data wiring will
            be added later.
          </p>
        </div>
      </section>

      <section className={styles.twoColumn}>
        <div className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Tree placeholder</h2>
            <span className="badge">UI only</span>
          </div>
          <div className={styles.placeholderTree}>
            <div className={styles.treeRow}>
              <span className={styles.treeDot} />
              Root category
            </div>
            <div className={styles.treeRow}>
              <span className={styles.treeDot} />
              └ Accessories
            </div>
            <div className={styles.treeRow}>
              <span className={styles.treeDot} />
              └ Apparel
            </div>
            <div className={styles.treeRow}>
              <span className={styles.treeDot} />
              └ Home goods
            </div>
          </div>
        </div>

        <div className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Create category</h2>
          </div>
          <form className={styles.form}>
            <label className={styles.field}>
              Name
              <input className="input" placeholder="Category name" type="text" />
            </label>
            <label className={styles.field}>
              Slug
              <input className="input" placeholder="category-slug" type="text" />
            </label>
            <label className={styles.field}>
              Parent ID
              <select className="input">
                <option value="">No parent</option>
                <option value="1">Root category</option>
                <option value="2">Accessories</option>
                <option value="3">Apparel</option>
              </select>
            </label>
            <div className={styles.actionRow}>
              <span className="muted">No API calls yet</span>
              <button className="btn btn-primary" type="button">
                Save draft
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
