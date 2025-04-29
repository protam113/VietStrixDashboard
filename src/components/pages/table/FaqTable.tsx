'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaqColumns } from '@/types/columns';
import { FaqTableProps } from '@/types/componentsType';
import NoResultsFound from '@/components/design/NoResultsFound';
import { Skeleton } from '@/components/ui/skeleton';
import { useUpdateFaq } from '@/hooks/faq/useFaQ';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaTrashRestore } from 'react-icons/fa';
import {
  FaqSelectStatus,
  VisibilityFaqOption,
} from '@/components/pages/faq/changeFaqStatus';
import { toast } from 'sonner';

export const FaqTable: React.FC<FaqTableProps> = ({
  faqs,
  isLoading,
  isError,
  onDelete,
}) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});
  const [faqVisibility, setFaqVisibility] = useState<
    Record<string, VisibilityFaqOption>
  >(
    faqs.reduce(
      (acc, faq) => {
        acc[faq._id] = faq.status as VisibilityFaqOption;
        return acc;
      },
      {} as Record<string, VisibilityFaqOption>
    )
  );
  const [, setSelectedFaq] = useState<string | null>(null);

  // Update faqVisibility when faqs change from API
  useEffect(() => {
    setFaqVisibility(
      faqs.reduce(
        (acc, faq) => {
          acc[faq._id] = faq.status as VisibilityFaqOption;
          return acc;
        },
        {} as Record<string, VisibilityFaqOption>
      )
    );
  }, [faqs]);

  const { mutate: updateFaq } = useUpdateFaq();

  const handleStatusChange = (
    faqId: string,
    newStatus: VisibilityFaqOption
  ) => {
    if (!faqId) {
      toast.error('Invalid FAQ ID!');
      return;
    }

    // Optimistic update
    setFaqVisibility((prev) => ({
      ...prev,
      [faqId]: newStatus,
    }));

    // Call API
    updateFaq({
      postId: faqId,
      updateStatus: { status: newStatus },
    });
  };

  const handleSelectFaq = (faqId: string) => {
    setSelectedFaq(faqId);
  };

  const toggleFaqExpansion = (faqId: string, event: React.MouseEvent) => {
    // Prevent triggering row selection when clicking the expand/collapse button
    event.stopPropagation();

    setExpandedFaqs((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  // Function to format the answer text to display 2-3 lines
  const formatAnswerPreview = (answer: string) => {
    // Display approximately 150-200 characters (roughly 2-3 lines)
    const previewLength = 180;

    if (answer.length > previewLength) {
      return answer.slice(0, previewLength) + '...';
    }
    return answer;
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {FaqColumns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isError ? (
            <TableRow>
              <TableCell colSpan={FaqColumns.length} className="text-center">
                <NoResultsFound />
              </TableCell>
            </TableRow>
          ) : isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {FaqColumns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : faqs.length > 0 ? (
            <>
              {faqs.map((faq) => (
                <React.Fragment key={faq._id}>
                  <TableRow
                    className={`border-b transition-colors ${
                      hoveredRow === faq._id ? 'bg-muted/50' : ''
                    }`}
                    onMouseEnter={() => setHoveredRow(faq._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => handleSelectFaq(faq._id)}
                  >
                    <TableCell className="w-1/6 text-left">
                      {faq._id.substring(0, 8) + '...'}
                    </TableCell>

                    <TableCell className="w-5/6">
                      <div>
                        <p className="font-semibold">{faq.question}</p>
                        <div className="relative">
                          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line min-h-[3em] line-clamp-3">
                            {!expandedFaqs[faq._id] && faq.answer.length > 180
                              ? formatAnswerPreview(faq.answer)
                              : faq.answer.length <= 180
                                ? faq.answer
                                : null}
                          </p>
                          {faq.answer.length > 180 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-6 text-xs flex items-center gap-1 p-1"
                              onClick={(e) => toggleFaqExpansion(faq._id, e)}
                            >
                              {expandedFaqs[faq._id] ? (
                                <>
                                  <ChevronUp className="h-3 w-3" /> Show less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-3 w-3" /> Read more
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="w-1/6">
                      <FaqSelectStatus
                        value={faqVisibility[faq._id]}
                        onChange={(newVisibility) =>
                          handleStatusChange(faq._id, newVisibility)
                        }
                      />
                    </TableCell>
                    <TableCell className="w-1/6">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                          onClick={() => onDelete(faq._id)}
                        >
                          <FaTrashRestore className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expandable content row */}
                  {expandedFaqs[faq._id] && faq.answer.length > 180 && (
                    <TableRow
                      className={`border-b ${
                        hoveredRow === faq._id ? 'bg-muted/30' : 'bg-muted/10'
                      }`}
                      onMouseEnter={() => setHoveredRow(faq._id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell className="py-2"></TableCell>
                      <TableCell colSpan={3} className="py-3">
                        <div className="text-sm text-muted-foreground pl-0 pr-4 pb-1 whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={FaqColumns.length} className="text-center">
                <NoResultsFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
