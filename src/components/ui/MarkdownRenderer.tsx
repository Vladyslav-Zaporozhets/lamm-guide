import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Info, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';

// Custom renderer to replace markdown elements with beautiful UI components
export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-slate prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800 prose-h3:text-xl prose-h3:text-slate-700 dark:prose-h3:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-table:border-collapse prose-th:bg-slate-50 dark:prose-th:bg-slate-800 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-slate-100 dark:prose-td:border-slate-800 prose-img:rounded-2xl prose-img:shadow-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          blockquote: ({ node, children, ref, ...props }) => {
            // Check if this blockquote is actually an alert
            // e.g. > [!WARNING], > [!INFO]
            const text = String(children).replace(/\n/g, '');
            const isInfo = text.includes('[!INFO]') || text.includes('[!NOTE]');
            const isWarning = text.includes('[!WARNING]') || text.includes('[!CAUTION]');
            const isDanger = text.includes('[!DANGER]') || text.includes('[!ERROR]');
            const isSuccess = text.includes('[!SUCCESS]');

            if (isInfo || isWarning || isDanger || isSuccess) {
              const cleanText = React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                  return child.replace(/\[!(INFO|NOTE|WARNING|CAUTION|DANGER|ERROR|SUCCESS)\]/g, '');
                }
                // Also clean up paragraph children if wrapped
                if (React.isValidElement(child)) {
                    const childElement = child as React.ReactElement<any>;
                    if (childElement.props && childElement.props.children) {
                      const childStr = String(childElement.props.children);
                      return React.cloneElement(childElement, {
                          children: childStr.replace(/\[!(INFO|NOTE|WARNING|CAUTION|DANGER|ERROR|SUCCESS)\]/g, '')
                      });
                    }
                }
                return child;
              });

              let alertClass = '';
              let Icon = Info;
              
              if (isWarning) {
                alertClass = 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-900/50 dark:text-yellow-200';
                Icon = AlertTriangle;
              } else if (isDanger) {
                alertClass = 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-200';
                Icon = XCircle;
              } else if (isSuccess) {
                alertClass = 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/50 dark:text-green-200';
                Icon = CheckCircle2;
              } else {
                alertClass = 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/50 dark:text-blue-200';
                Icon = Info;
              }

              return (
                <div className={`my-6 p-4 border rounded-2xl flex items-start space-x-3 not-prose ${alertClass}`}>
                  <Icon className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium text-base">{cleanText}</div>
                </div>
              );
            }

            // Default blockquote
            return (
              <blockquote className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 italic text-slate-600 dark:text-slate-400">
                {children}
              </blockquote>
            );
          },
          table: ({ node, children, ref, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm not-prose">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm text-left">
                {children}
              </table>
            </div>
          ),
          th: ({ node, children, ref, ...props }) => (
            <th className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 font-semibold text-slate-900 dark:text-white">
              {children}
            </th>
          ),
          td: ({ node, children, ref, ...props }) => (
            <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
