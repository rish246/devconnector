import React from "react";

const Education = ({ education }) => {
    return education.map((edu, index) => (
        <div
            key={index}
            className="mb-6 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-start gap-4">
                {/* School Initial/Logo */}
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">
                        {edu.school[0].toUpperCase()}
                    </span>
                </div>

                <div className="flex-1">
                    {/* School and Degree */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {edu.school}
                            </h3>
                            <p className="text-gray-700">{edu.degree}</p>
                        </div>
                        <span className="text-sm pl-2 text-gray-500">
                            {formatDate(edu.from)} -{" "}
                            {edu.to ? formatDate(edu.to) : "Present"}
                        </span>
                    </div>

                    {/* Field of Study */}
                    {edu.fieldOfStudy && (
                        <p className="mt-2 text-sm text-gray-500">
                            <strong>Field of Study: </strong>
                            {edu.fieldOfStudy}
                        </p>
                    )}

                    {/* Description */}
                    {edu.description && (
                        <div className="mt-4 text-gray-700">
                            <ul className="list-disc pl-6 space-y-2">
                                {edu.description.split("\n").map((line, i) => (
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

// Helper function for date formatting
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
};

export default Education;
