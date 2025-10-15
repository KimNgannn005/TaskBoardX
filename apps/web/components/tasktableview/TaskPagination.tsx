"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "@workspace/ui/components/pagination";
import React from "react";

interface TaskPaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

export default function TaskPagination({
                                           currentPage,
                                           totalPages,
                                           setCurrentPage,
                                       }: TaskPaginationProps) {
    const handlePreviousClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage(page);
    };

    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    return (
        <div className="flex justify-center mt-6">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={handlePreviousClick}
                            className={isPreviousDisabled ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <a
                                href="#"
                                onClick={handlePageClick(page)}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 w-10 ${
                                    currentPage === page
                                        ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                }`}
                            >
                                {page}
                            </a>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={handleNextClick}
                            className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}