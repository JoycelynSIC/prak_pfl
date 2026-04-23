import React from "react";

export default function PageHeader({ title, breadcrumb, children }) {
    const breadcrumbList = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4 mb-6">
            <div id="pageheader-left" className="flex flex-col">
                <h1 id="page-title" className="text-3xl font-bold text-[#2D2D2D]">
                    {title}
                </h1>
                
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    {breadcrumbList.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className="text-gray-400 capitalize">{item}</span>
                            {index < breadcrumbList.length - 1 && (
                                <span className="text-gray-300">/</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div id="action-button">
                {children}
            </div>
        </div>
    );
}