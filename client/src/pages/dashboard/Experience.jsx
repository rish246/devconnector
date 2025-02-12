import React from "react";
const Experience = ({ experience }) => {
    return experience.map((exp, index) => (
        <div
            key={index}
            className="mb-6 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-start gap-4">
                {/* Company Initial/Logo */}
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                        {exp.company[0].toUpperCase()}
                    </span>
                </div>

                <div className="flex-1">
                    {/* Position and Company */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {exp.position}
                            </h3>
                            <p className="text-gray-700">{exp.company}</p>
                        </div>
                        <span className="text-sm pl-2 text-gray-500">
                            {formatDate(exp.from)} -{" "}
                            {exp.to ? formatDate(exp.to) : "Present"}
                        </span>
                    </div>

                    {/* Employment Type and Location */}
                    <div className="mt-2 text-sm text-gray-500">
                        {exp.employmentType && (
                            <span className="mr-4">{exp.employmentType}</span>
                        )}
                        {exp.location && <span>{exp.location}</span>}
                    </div>

                    {/* Description */}
                    {exp.description && (
                        <div className="mt-4 text-gray-700">
                            <ul className="list-disc pl-6 space-y-2">
                                {exp.description.split("\n").map((line, i) => (
                                    <li key={i}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ));
};

// Helper function for date formatting (you'll need date-fns or similar)
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
};

export default Experience;
