export default function IncideskSkeleton() {
  return (
    <div className="w-full flex justify-center px-4 py-10 animate-pulse">
      <div className="w-full flex flex-col bg-white rounded-2xl shadow-xl">
        
        {/* HEADER */}
        <div className="border-b px-8 py-6 space-y-3 w-full flex flex-col">
          <div className="h-6 w-1/3 bg-gray-300 rounded-md" />
          <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
        </div>

        {/* BODY */}
        <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Campo */}
          <SkeletonField />
          <SkeletonField />
          <SkeletonField />
          <SkeletonField />

          {/* Campo largo */}
          <div className="lg:col-span-2 space-y-2">
            <div className="h-4 w-1/4 bg-gray-200 rounded-md" />
            <div className="h-24 w-full bg-gray-300 rounded-lg" />
          </div>

          {/* Botón */}
          <div className="lg:col-span-2 flex justify-end pt-4">
            <div className="h-10 w-32 bg-blue-300 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Subcomponente interno */
function SkeletonField() {
  return (
    <div className="space-y-2">
      <div className="h-4 w-1/3 bg-gray-200 rounded-md" />
      <div className="h-10 w-full bg-gray-300 rounded-lg" />
    </div>
  );
}
