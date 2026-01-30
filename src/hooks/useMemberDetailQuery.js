import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ONE_HOUR = 60 * 60 * 1000;

// Static members definition to handle local-only additions
const staticMembers = {
  "brandi-martinez": {
    _id: "brandi-martinez",
    name: "Brandi Martinez",
    designation: "Sales Support | Operations",
    email: "brandi@masonamelia.com",
    phone: "(210) 954-6022",
    address: "", // Or specific location if known
    team_member_picture: "/images/team/brandi.png",
    description: "<p>Sales Support | Operations</p>",
  },
};

async function fetchMemberDetail(id) {
  // 1. Check if ID exists in staticMembers (normalize id)
  const normalizedId = id?.toString().trim();
  if (staticMembers[normalizedId]) {
    return staticMembers[normalizedId];
  }

  // 2. Otherwise fetch from API
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/teams/lists/${normalizedId}`
  );
  
  const member = res.data.data;
  if (member?.name?.trim().toLowerCase() === "meet donny") {
    member.name = "Donny Gabriel";
  }

  // Normalize picture field (API uses profile_picture, frontend expectation is team_member_picture)
  if (member && member.profile_picture && !member.team_member_picture) {
    member.team_member_picture = member.profile_picture;
  }
  
  return member; // single member object
}

export function useMemberDetail(id, opts) {
  return useQuery({
    queryKey: ["member-detail", id],
    queryFn: () => fetchMemberDetail(id),
    enabled: !!id,               // don't fire until we have an id
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
    refetchOnWindowFocus: false,
    ...opts,
  });
}
