export const useGetStakingTime = ({
  maxClaims,
  nextClaim,
  claims,
  endTime,
}: {
  maxClaims: number;
  nextClaim: number;
  claims: number;
  endTime: number;
}) => {
  const endOfStaking = maxClaims === 1 ? nextClaim : endTime;
  const duration = (endOfStaking - nextClaim) / (maxClaims - (claims + 1));

  return { endOfStaking, duration };
};
