import EntertainmentSidebar from "@/components/entertainment/EntertainmentSidebar";

export default function EntertainmentLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 py-10 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="shrink-0">
            <EntertainmentSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>  
    </div>
  );
}
