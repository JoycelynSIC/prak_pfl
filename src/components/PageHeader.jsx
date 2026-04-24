import React from "react";
export default function PageHeader({ title, breadcrumb, children }) {
    const breadcrumbList = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];
    return (
        <div className="flex items-center justify-between p-6 mb-2 animate-in fade-in slide-in-from-left 
        duration-700">
            <div className="flex flex-col group">
                <h1 className="text-3xl font-black text-[#546B41] tracking-tighter transition-all duration-300 
                group-hover:pl-2 border-[#99AD7A] group-hover:border-l-4">
                    {title}
                </h1>  
                <div className="flex items-center font-bold space-x-2 mt-1 overflow-hidden">
                    {breadcrumbList.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className="text-[#99AD7A] capitalize text-sm hover:text-[#546B41] 
                            transition-colors cursor-pointer animate-in slide-in-from-bottom-2 duration-500" 
                            style={{ animationDelay: `${index * 100}ms` }}>
                                {item}
                            </span>
                            {index < breadcrumbList.length - 1 && (
                                <span className="text-[#DCCCAC] text-xs animate-in fade-in duration-1000">/
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="hover:scale-110 active:scale-90 transition-all duration-300 ease-out">
                {children}
            </div>
        </div>
    );
}