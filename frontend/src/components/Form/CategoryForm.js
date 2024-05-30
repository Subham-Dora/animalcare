import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <label htmlFor="category">Category</label>
        </div>

        <button
          type="submit"
          className="btn btn-primary rounded-pill py-3 px-5"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
