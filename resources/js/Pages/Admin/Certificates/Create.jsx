import React from "react";
import { useForm, Link } from "@inertiajs/inertia-react";
import AdminNav from "../AdminNav";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  placeholder = "",
}) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Enter ${label.toLowerCase()} here`}
      className="p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all"
      aria-label={label}
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
  className = "",
}) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="p-3 text-black border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    certificate_id: "",
    holder_name: "",
    issued_date: "",
    expiry_date: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.certificates.store"));
  };

  return (
    
    <div className="min-h-screen">
      <AdminNav />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Create Certificate
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Certificate ID"
            value={data.certificate_id}
            onChange={(e) =>
              setData("certificate_id", e.target.value)
            }
          />
          {errors.certificate_id && (
            <div className="text-red-600 text-sm mt-1">
              {errors.certificate_id}
            </div>
          )}

          <InputField
            label="Holder Name"
            value={data.holder_name}
            onChange={(e) =>
              setData("holder_name", e.target.value)
            }
          />
          {errors.holder_name && (
            <div className="text-red-600 text-sm mt-1">
              {errors.holder_name}
            </div>
          )}

          <InputField
            label="Issued Date"
            type="date"
            value={data.issued_date}
            onChange={(e) =>
              setData("issued_date", e.target.value)
            }
          />
          {errors.issued_date && (
            <div className="text-red-600 text-sm mt-1">
              {errors.issued_date}
            </div>
          )}

          <InputField
            label="Expiry Date"
            type="date"
            value={data.expiry_date}
            onChange={(e) =>
              setData("expiry_date", e.target.value)
            }
          />
          {errors.expiry_date && (
            <div className="text-red-600 text-sm mt-1">
              {errors.expiry_date}
            </div>
          )}

          <SelectField
            label="Category"
            value={data.category}
            onChange={(e) =>
              setData("category", e.target.value)
            }
            options={[
              { value: "ISO 9001", label: "ISO 9001" },
              { value: "ISO 14001", label: "ISO 14001" },
              { value: "ISO 45001", label: "ISO 45001" },
            ]}
          />
          {errors.category && (
            <div className="text-red-600 text-sm mt-1">
              {errors.category}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={processing}
              className="bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Creating..." : "Create Certificate"}
            </button>
            <Link
              href={route("admin.certificates.index")}
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              Back to Certificates
            </Link>
          </div>
        </form>
      </div>
    </div>
      
    
  );
}
