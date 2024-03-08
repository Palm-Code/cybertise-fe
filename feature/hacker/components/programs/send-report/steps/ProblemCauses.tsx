import { FileInput, Tiptap } from "@/core/ui/components";
import { useState } from "react";

const ProblemCauses = () => {
  const [description, setDescription] = useState("");
  return (
    <div className="_flexbox__col__start__start w-full gap-8">
      <Tiptap
        description={description}
        label="Impact"
        onChangeValue={(v) => setDescription(v)}
        onClearInput={() => setDescription("")}
        variant="hacker"
        withTooltip
      />
      <Tiptap
        description=""
        label="Proof of Concept"
        onChangeValue={() => {}}
        variant="hacker"
        withTooltip
      />
      <FileInput />
    </div>
  );
};
export default ProblemCauses;
