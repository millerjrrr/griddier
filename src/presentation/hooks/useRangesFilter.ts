import { useMemo, useState } from "react";
import { useGetPokerRanges } from "@/presentation/hooks/useGetPokerRanges";
import type { PokerRange } from "@/domain/models/PokerRange";
import type { PositionName } from "@/domain/value-objects/Position";
import { VsActionValue } from "@/domain/value-objects/VsActions";
import { StackSize } from "@/domain/value-objects/StackSize";
import { RangesFilter } from "../types/rangeFilter";

const initialFilter: RangesFilter = {
  activated: false,
  position: null,
  action: null,
  stack: null,
};

export const useRangesFilter = (
  pokerRangeIds: number[],
) => {
  const { data: allRanges } = useGetPokerRanges();
  const [filter, setFilter] =
    useState<RangesFilter>(initialFilter);

  const filteredPokerRangeIds = useMemo(() => {
    const allowedIds = new Set(pokerRangeIds);

    return allRanges
      .filter((range: PokerRange) => {
        if (filter.activated === false) return true;

        if (!allowedIds.has(range.id)) {
          return false;
        }

        if (
          filter.stack !== null &&
          range.spotDescription.stacks !== filter.stack
        ) {
          return false;
        }

        if (
          filter.position !== null &&
          range.spotDescription.hero !== filter.position
        ) {
          return false;
        }

        if (
          filter.action !== null &&
          range.spotDescription.vsAction !== filter.action
        ) {
          return false;
        }

        return true;
      })
      .map((range) => range.id);
  }, [allRanges, pokerRangeIds, filter]);

  const clearFilter = () => {
    setFilter(initialFilter);
  };

  return {
    filter,
    setFilter,
    filteredPokerRangeIds,
    clearFilter,
  };
};
