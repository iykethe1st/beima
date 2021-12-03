import React, { useState } from "react";

import {
  barchartImage,
  cubeImage,
  lockImage,
  piechartImage,
} from "../../../../assets/images";

import { FlexiblePlanForm } from "../../../../components";
import { PensionsCard } from "../PensionsCard";
import styles from "./pension-plans.module.css";

function PensionPlans(props) {
  const [activePlan, setActivePlan] = useState(null);
  const plans = {
    flexible: (
      <FlexiblePlanForm
        onClose={() => setActivePlan(null)}
        isOpen={activePlan === "flexible"}
      />
    ),
  };
  return (
    <div className={`${styles["container"]}`}>
      {plans[activePlan] || null}
      <div className="grid grid-cols-4 gap-4">
        <div
          className="col-span-4 md:col-span-2 lg:col-span-1"
          onClick={() => setActivePlan("flexible")}
        >
          <PensionsCard
            Icon={barchartImage}
            text="Flexible time plan"
            alt="Flexible"
          />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <PensionsCard
            isDisabled={true}
            Icon={lockImage}
            text="Retirement plan"
            alt="retirement"
          />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <PensionsCard
            isDisabled={true}
            Icon={cubeImage}
            text="10yrs plan"
            alt="10yrs"
          />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <PensionsCard
            isDisabled={true}
            Icon={piechartImage}
            text="3yrs plan"
            alt="3yrs"
          />
        </div>
      </div>
    </div>
  );
}

export { PensionPlans };
