"use client";
import {
  Badge,
  Card,
  Indicator,
  Separator,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import ModalForbiddden from "@/core/ui/container/modals/ModalForbidden";
import { VRPCompaniesCardType } from "@/types/admin/vrp-launchpad";
import { useState } from "react";

const VRPCard = ({ id, title, asset_type, status }: VRPCompaniesCardType) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <AnimationWrapper>
      <Mobile>
        <Card isButton onClick={() => setShowModal(true)}>
          <div className="_flexbox__col__start__start w-full gap-4">
            <div className="_flexbox__col__start__start w-full gap-4">
              <Typography variant="p" affects="large" weight="semibold">
                {title}
              </Typography>
              <Indicator variant="caution">{status}</Indicator>
            </div>
            <Separator orientation="horizontal" />
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography variant="p" affects="small">
                  Assets type available
                </Typography>
                <div className="flex flex-wrap items-center gap-4">
                  {asset_type.map((item, index) => (
                    <Badge key={index} variant={item.value}>
                      {item.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <ModalForbiddden
          title="Continue on Desktop"
          subtitle="Creating VRP feature are currently only accessible on the desktop version of our website."
          variant="mediator"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </Mobile>
      <Desktop>
        <Card isClickable href={`/vrp-launchpad/${id}`}>
          <div className="_flexbox__col__start__start w-full gap-12">
            <div className="_flexbox__row__center__between w-full">
              <Typography variant="p" affects="large" weight="semibold">
                {title}
              </Typography>
              <Indicator variant="caution">{status}</Indicator>
            </div>
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography variant="p" affects="small">
                  Assets type available
                </Typography>
                <div className="grid grid-flow-col gap-4">
                  {asset_type.map((item, index) => (
                    <Badge key={index} variant={item.value}>
                      {item.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </AnimationWrapper>
  );
};

const VrpCardList = ({ data }: { data: VRPCompaniesCardType[] }) => {
  return data.map((item, index) => <VRPCard key={index} {...item} />);
};

export default VrpCardList;
