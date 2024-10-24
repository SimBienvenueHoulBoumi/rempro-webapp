import React from "react";
import ProgressionForm from "@/components/ProgressionForm";
import ProgressionList from "@/components/ProgressionList";

export default function page() {
  return (
    <div>
      <div className="flex">
        {/* progression add forms */}
        <ProgressionForm />
        {/* progression list */}
        <ProgressionList />
      </div>
    </div>
  );
}
