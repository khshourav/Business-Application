import React, { useEffect } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import HeroSection from "@/Common/HeroSection";
import BackgroundEffects from "@/Common/BackgroundEffects";

const InputField = ({
    label,
    type = "text",
    value,
    onChange, // Use this prop directly
    error,
    className = "",
    required = false,
    readOnly = false,
}) => (
    <div className={`flex flex-col ${className}`}>
        <label className="text-sm font-medium text-text-primary mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type={type}
            value={value || ""}
            onChange={onChange} // Use the passed onChange directly
            readOnly={readOnly}
            className={`p-2 border ${
                error ? "border-red-500" : "border-primary"
            } rounded-lg focus:outline-none ${
                readOnly
                    ? "bg-gray-100 cursor-not-allowed"
                    : "focus:ring-2 focus:ring-secondary"
            }`}
            aria-label={label}
            aria-invalid={!!error}
            aria-describedby={error ? `${label}-error` : undefined}
            required={required}
        />
        {error && (
            <p id={`${label}-error`} className="text-red-500 text-sm mt-1">
                {error}
            </p>
        )}
    </div>
);

// Enhanced Select Component
const SelectField = ({
    label,
    value,
    onChange,
    options,
    error,
    className = "",
    required = false,
}) => (
    <div className={`flex flex-col ${className}`}>
        <label className="text-sm font-medium text-text-primary mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
            value={value}
            onChange={onChange}
            className={`p-2 border ${
                error ? "border-red-500" : "border-primary"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary`}
            aria-invalid={!!error}
            aria-describedby={error ? `${label}-error` : undefined}
            required={required}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && (
            <p id={`${label}-error`} className="text-red-500 text-sm mt-1">
                {error}
            </p>
        )}
    </div>
);

// Enhanced Checkbox Component
const CheckboxField = ({ label, checked, onChange, className = "", error }) => (
    <label className={`flex items-center space-x-2 ${className}`}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={`form-checkbox h-4 w-4 ${
                error ? "text-red-500" : "text-primary"
            } rounded focus:ring-secondary`}
            aria-invalid={!!error}
        />
        <span
            className={`text-sm ${
                error ? "text-red-500" : "text-text-primary"
            }`}
        >
            {label}
        </span>
    </label>
);

export default function EditApplication({ application, errors }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing } = useForm({
        _method: "PUT",
        ...application,
        company_name: application.company_name ?? "",
        tin_bin_vat_gst: application.tin_bin_vat_gst ?? "",
        factory_name: application.factory_name ?? "",
        factory_address: application.factory_address ?? "",
        city: application.city ?? "",
        postal_code: application.postal_code ?? "",
        country: application.country ?? "",
        contact_person: application.contact_person ?? "",
        contact_number: application.contact_number ?? "",
        email: application.email ?? "",
        management_representative: application.management_representative ?? "",
        consultant: application.consultant ?? "",
        employees_male: Number(application.employees_male) || 0,
        employees_female: Number(application.employees_female) || 0,
        employees_total: application.employees_total ?? "",
        factory_function: application.factory_function ?? "",
        production_processes: application.production_processes ?? "",
        product_category: application.product_category ?? "",
        smeta: application.smeta ?? "",
        audit_type: application.audit_type ?? "",
        slcp: application.slcp ?? "",
        verification_notification_method:
            application.verification_notification_method ?? "",
        sac_higg_fem_verification: application.sac_higg_fem_verification ?? "",
        iso_management_system_certification:
            application.iso_management_system_certification ?? "",
        outsource_process: application.outsource_process ?? "",
        resources: application.resources ?? "",
        brand_customer_name: application.brand_customer_name ?? "",
        certifications: application.certifications ?? [],
        other_certifications: application.other_certifications ?? "",
        date: application.date
            ? new Date(application.date).toISOString().split("T")[0]
            : "",
        authorizing_name: application.authorizing_name ?? "",
        title: application.title ?? "",
        signature_file_path: null, // for new file uploads
        signature_name: application.signature_name ?? "",
    });

    // Auto-calculate total employees if data changes
    useEffect(() => {
        const total =
            Number(data.employees_male) + Number(data.employees_female);
        setData("employees_total", isNaN(total) ? "" : total);
    }, [data.employees_male, data.employees_female]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        put(route("applications.update", application.uuid), {
            ...data,
            _token: document.querySelector('meta[name="csrf-token"]').content,
        }, {
            forceFormData: true,
            preserveScroll: true,
            onError: (errors) => {
                console.error("Submission errors:", errors);
            },
            onSuccess: () => {
                // Optional success handling
            }
        });
    };


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
            alert("Please upload a PNG, JPEG, or JPG file");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("File size must be less than 2MB");
            return;
        }
        setData("signature_file_path", file);
    };

    return (
        <AppLayout title="Edit Application">
            <HeroSection
                title="Edit Application"
                backgroundImage="/images/svbg/grid2.svg"
                className="bg-gradient-to-b from-blue-600 to-blue-700"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-accent mb-8">
                    Edit Application
                </h1>
            </HeroSection>

            
                <section className="min-h-screen flex items-center justify-center p-4 bg-primary/90">
                    {flash?.success && (
                        <div className="bg-green-100 p-4 mb-4 rounded-lg">
                            {flash.success}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto p-6 my-6 bg-blue-50 rounded-lg shadow-2xl border border-primary"
                    >
                        {/* Replicate your form sections with inputs similar to your ApplicationForm */}
                        <div className="mb-8 p-6 bg-white rounded-lg border border-primary">
                            <h2 className="text-lg font-semibold text-primary mb-4">
                                Applicant Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Applicant Company Name"
                                    value={data.company_name}
                                    onChange={(e) =>
                                        setData("company_name", e.target.value)
                                    }
                                    error={errors.company_name}
                                    required
                                />
                                <InputField
                                    label="TIN/BIN/VAT/GST no"
                                    value={data.tin_bin_vat_gst}
                                    onChange={(e) =>
                                        setData(
                                            "tin_bin_vat_gst",
                                            e.target.value
                                        )
                                    }
                                    error={errors.tin_bin_vat_gst}
                                    required
                                />
                            </div>
                        </div>
                        {/* Add additional sections as in your ApplicationForm... */}
                        {/* Factory Information Section */}
                        <div className="mb-8 p-6 bg-white rounded-lg border border-primary">
                            <h2 className="text-lg font-semibold text-primary mb-4">
                                Factory Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Factory Name"
                                    value={data.factory_name}
                                    onChange={(e) =>
                                        setData("factory_name", e.target.value)
                                    }
                                    error={errors.factory_name}
                                    required
                                />
                                <InputField
                                    label="Factory Address"
                                    value={data.factory_address}
                                    onChange={(e) =>
                                        setData(
                                            "factory_address",
                                            e.target.value
                                        )
                                    }
                                    error={errors.factory_address}
                                    required
                                />
                                <InputField
                                    label="City"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                    error={errors.city}
                                    required
                                />
                                <InputField
                                    label="Postal Code"
                                    value={data.postal_code}
                                    onChange={(e) =>
                                        setData("postal_code", e.target.value)
                                    }
                                    error={errors.postal_code}
                                    required
                                />
                                <InputField
                                    label="Country"
                                    value={data.country}
                                    onChange={(e) =>
                                        setData("country", e.target.value)
                                    }
                                    error={errors.country}
                                    required
                                />
                                <InputField
                                    label="Contact Person"
                                    value={data.contact_person}
                                    onChange={(e) =>
                                        setData(
                                            "contact_person",
                                            e.target.value
                                        )
                                    }
                                    error={errors.contact_person}
                                    required
                                />
                                <InputField
                                    label="Contact Number"
                                    value={data.contact_number}
                                    onChange={(e) =>
                                        setData(
                                            "contact_number",
                                            e.target.value
                                        )
                                    }
                                    error={errors.contact_number}
                                    required
                                />
                                <InputField
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    error={errors.email}
                                    required
                                />
                            </div>
                        </div>

                        {/* Management and Employees Section */}
                        <div className="mb-8 p-6 bg-white rounded-lg border border-primary">
                            <h2 className="text-lg font-semibold text-primary mb-4">
                                Management and Employees
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Management Representative"
                                    value={data.management_representative}
                                    onChange={(e) =>
                                        setData(
                                            "management_representative",
                                            e.target.value
                                        )
                                    }
                                    error={errors.management_representative}
                                    required
                                />
                                <InputField
                                    label="Consultant (if any)"
                                    value={data.consultant}
                                    onChange={(e) =>
                                        setData("consultant", e.target.value)
                                    }
                                    error={errors.consultant}
                                />
                                <InputField
                                    label="No. of Employees (Male)"
                                    type="number"
                                    required
                                    value={data.employees_male}
                                    onChange={(e) =>
                                        setData(
                                            "employees_male",
                                            e.target.value
                                        )
                                    }
                                    error={errors.employees_male}
                                />
                                <InputField
                                    label="No. of Employees (Female)"
                                    type="number"
                                    required
                                    value={data.employees_female}
                                    onChange={(e) =>
                                        setData(
                                            "employees_female",
                                            e.target.value
                                        )
                                    }
                                    error={errors.employees_female}
                                />
                                <InputField
                                    label={
                                        <span>
                                            Total Employees{" "}
                                            <span className="ml-2 text-gray-500 text-xs">
                                                [Auto Calculated]
                                            </span>
                                        </span>
                                    }
                                    value={data.employees_total}
                                    readOnly // Disable editing
                                    className=""
                                />

                                <InputField
                                    label="Factory Function"
                                    value={data.factory_function}
                                    onChange={(e) =>
                                        setData(
                                            "factory_function",
                                            e.target.value
                                        )
                                    }
                                    error={errors.factory_function}
                                />
                            </div>
                        </div>

                        {/* Production and Product Section */}
                        <div className="mb-8 p-6 bg-white rounded-lg border border-primary">
                            <h2 className="text-lg font-semibold text-primary mb-4">
                                Production and Product
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Production Processes"
                                    value={data.production_processes}
                                    onChange={(e) =>
                                        setData(
                                            "production_processes",
                                            e.target.value
                                        )
                                    }
                                    error={errors.production_processes}
                                />
                                <InputField
                                    label="Product Category"
                                    value={data.product_category}
                                    onChange={(e) =>
                                        setData(
                                            "product_category",
                                            e.target.value
                                        )
                                    }
                                    error={errors.product_category}
                                />
                            </div>
                        </div>

                        {/* Audit and Certification Section */}
                        <div className="mb-8 p-6 bg-white rounded-lg border border-primary">
                            <h2 className="text-lg font-semibold text-primary mb-6">
                                Audit and Certification
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* ISO Management System Certification */}
                                <SelectField
                                    label="ISO Management System Certification"
                                    value={
                                        data.iso_management_system_certification
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "iso_management_system_certification",
                                            e.target.value
                                        )
                                    }
                                    options={[
                                        { value: "", label: "Select" },
                                        {
                                            value: "ISO 9001",
                                            label: "ISO 9001",
                                        },
                                        {
                                            value: "ISO 14001",
                                            label: "ISO 14001",
                                        },
                                        {
                                            value: "ISO 45001",
                                            label: "ISO 45001",
                                        },
                                    ]}
                                    error={
                                        errors.iso_management_system_certification
                                    }
                                />

                                {/* SMETA */}
                                <SelectField
                                    label="SMETA"
                                    value={data.smeta}
                                    onChange={(e) =>
                                        setData("smeta", e.target.value)
                                    }
                                    options={[
                                        { value: "", label: "Select" },
                                        {
                                            value: "2-Pillar",
                                            label: "2-Pillar",
                                        },
                                        {
                                            value: "4-Pillar",
                                            label: "4-Pillar",
                                        },
                                    ]}
                                    error={errors.smeta}
                                />

                                {/* Audit Type */}
                                <SelectField
                                    label="Audit Type"
                                    value={data.audit_type}
                                    onChange={(e) =>
                                        setData("audit_type", e.target.value)
                                    }
                                    options={[
                                        { value: "", label: "Select" },
                                        {
                                            value: "Full Initial",
                                            label: "Full Initial",
                                        },
                                        {
                                            value: "Periodic",
                                            label: "Periodic",
                                        },
                                        {
                                            value: "Follow up",
                                            label: "Follow up",
                                        },
                                        {
                                            value: "Desktop Review",
                                            label: "Desktop Review",
                                        },
                                    ]}
                                    error={errors.audit_type}
                                    required
                                />

                                {/* SLCP */}
                                <SelectField
                                    label="SLCP"
                                    value={data.slcp}
                                    onChange={(e) =>
                                        setData("slcp", e.target.value)
                                    }
                                    options={[
                                        { value: "", label: "Select" },
                                        { value: "Step 1", label: "Step 1" },
                                        {
                                            value: "Step 1 + 2",
                                            label: "Step 1 + 2",
                                        },
                                        {
                                            value: "Step 1 + 2 + 3",
                                            label: "Step 1 + 2 + 3",
                                        },
                                    ]}
                                    error={errors.slcp}
                                />

                                {/* Verification Notification Method */}
                                <SelectField
                                    label="Verification Notification Method"
                                    value={
                                        data.verification_notification_method
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "verification_notification_method",
                                            e.target.value
                                        )
                                    }
                                    options={[
                                        { value: "", label: "Select" },
                                        {
                                            value: "Announced",
                                            label: "Announced",
                                        },
                                        {
                                            value: "Semi-Announced",
                                            label: "Semi-Announced",
                                        },
                                        {
                                            value: "Unannounced",
                                            label: "Unannounced",
                                        },
                                    ]}
                                    error={
                                        errors.verification_notification_method
                                    }
                                    required
                                />

                                {/* SAC Higg FEM Verification */}
                                <SelectField
                                    label="SAC Higg FEM Verification"
                                    value={data.sac_higg_fem_verification}
                                    onChange={(e) =>
                                        setData(
                                            "sac_higg_fem_verification",
                                            e.target.value
                                        )
                                    }
                                    options={[
                                        { value: "", label: "Select" },
                                        {
                                            value: "On-site Verification",
                                            label: "On-site Verification",
                                        },
                                        {
                                            value: "Off-site Verification",
                                            label: "Off-site Verification",
                                        },
                                    ]}
                                    error={errors.sac_higg_fem_verification}
                                />
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="mb-8 p-6 bg-white rounded-lg border border-primary">
                            <h2 className="text-lg font-semibold text-primary mb-4">
                                Additional Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Outsource process or services (if any)"
                                    value={data.outsource_process}
                                    onChange={(e) =>
                                        setData(
                                            "outsource_process",
                                            e.target.value
                                        )
                                    }
                                    error={errors.outsource_process}
                                />
                                <InputField
                                    label="Resources (Human/Technical)"
                                    value={data.resources}
                                    onChange={(e) =>
                                        setData("resources", e.target.value)
                                    }
                                    error={errors.resources}
                                />
                                <InputField
                                    label="Brand / Customer Name"
                                    value={data.brand_customer_name}
                                    onChange={(e) =>
                                        setData(
                                            "brand_customer_name",
                                            e.target.value
                                        )
                                    }
                                    error={errors.brand_customer_name}
                                />
                            </div>
                        </div>

                        {/* Certifications Section */}
                        <div className="mb-8 p-6 bg-white rounded-lg border border-primary">
                            <h2 className="text-lg font-semibold text-primary mb-4">
                                Certifications
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    "C-TPAT",
                                    "Client COC",
                                    "FSC",
                                    "EIA",
                                    "ESIA",
                                    "GMP",
                                    "HACCP",
                                    "Internal",
                                    "ISO 9001",
                                    "ISO 14001",
                                    "ISO 45001",
                                    "ISO 22000",
                                ].map((cert) => (
                                    <CheckboxField
                                        key={cert}
                                        label={cert}
                                        checked={
                                            data.certifications?.includes(
                                                cert
                                            ) || false
                                        }
                                        onChange={(e) => {
                                            const updatedCerts = e.target
                                                .checked
                                                ? [...data.certifications, cert]
                                                : data.certifications.filter(
                                                      (c) => c !== cert
                                                  );
                                            setData(
                                                "certifications",
                                                updatedCerts
                                            );
                                        }}
                                        error={errors.certifications}
                                    />
                                ))}
                            </div>
                            <InputField
                                label="Others (Please specify)"
                                value={data.other_certifications}
                                onChange={(e) =>
                                    setData(
                                        "other_certifications",
                                        e.target.value
                                    )
                                }
                                className="mt-4"
                            />
                        </div>

                        {/* Authorizing Information Section */}
                        <div className="mb-8 p-6 bg-white rounded-lg border border-primary">
                            <h2 className="text-lg font-semibold text-primary mb-4">
                                Authorizing Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Date"
                                    type="date"
                                    value={data.date}
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                    error={errors.date}
                                    required
                                />
                                <InputField
                                    label="Authorizing Name"
                                    value={data.authorizing_name}
                                    onChange={(e) =>
                                        setData(
                                            "authorizing_name",
                                            e.target.value
                                        )
                                    }
                                    error={errors.authorizing_name}
                                    required
                                />
                                <InputField
                                    label="Title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    error={errors.title}
                                    required
                                />
                            </div>
                        </div>
                        {/* Signature Section */}
                        <div className="mt-6">
                            <h3 className="text-md font-semibold text-gray-700 mb-4">
                                Signature
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Signature (PNG/JPG, max 2MB)
                                    </label>
                                    <input
                                        type="file"
                                        name="signature_file_path"
                                        accept="image/png, image/jpeg"
                                        onChange={handleFileUpload}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {data.signature_file_path &&
                                        typeof data.signature_file_path ===
                                            "object" && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Selected:{" "}
                                                    {
                                                        data.signature_file_path
                                                            .name
                                                    }
                                                </p>
                                                <img
                                                    src={URL.createObjectURL(
                                                        data.signature_file_path
                                                    )}
                                                    alt="Signature preview"
                                                    className="mt-2 w-32 h-16 object-contain border rounded"
                                                />
                                            </div>
                                        )}
                                    {errors.signature_file_path && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.signature_file_path}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <InputField
                                        label="Or Type Your Name"
                                        required
                                        value={data.signature_name}
                                        onChange={(e) =>
                                            setData(
                                                "signature_name",
                                                e.target.value
                                            )
                                        }
                                        error={errors.signature_name}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {processing
                                ? "Submitting..."
                                : "Update Application"}
                        </button>
                    </form>
                </section>
            
        </AppLayout>
    );
}
