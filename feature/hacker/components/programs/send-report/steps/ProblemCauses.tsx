import { Tiptap } from "@/core/ui/components";
import { useState } from "react";

const ProblemCauses = () => {
  const [description, setDescription] = useState("");
  return (
    <div className="_flexbox__col__start__start w-full gap-8">
      <Tiptap
        description={description}
        label="Impact"
        onChange={(v) => setDescription(v)}
        onClearInput={() => setDescription("")}
        withTooltip
      />
      <Tiptap
        description=""
        label="Proof of Concept"
        onChange={() => {}}
        withTooltip
      />
    </div>
  );
};
export default ProblemCauses;
