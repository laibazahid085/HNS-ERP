import * as React from 'react';

export interface TimelineEventItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

export function Timeline({ events }: { events: TimelineEventItem[] }) {
  return (
    <div className="relative space-y-4 pl-6 before:absolute before:left-2.5 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-[#f0f2f7] dark:before:bg-[#0a2d6b]">
      {events.map((event) => (
        <div key={event.id} className="relative flex items-start gap-3">
          <div className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-[#001f5b] border border-[#f0f2f7] dark:border-[#0a2d6b] text-[#C02080]">
            {event.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#001F5B] dark:text-white">
                {event.title}
              </p>
              <span className="text-[10px] text-[#5a6478] dark:text-[#a0aec0]">
                {event.timestamp}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#5a6478] dark:text-[#a0aec0]">
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}