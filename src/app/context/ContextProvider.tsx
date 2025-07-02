import React, { ReactNode, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../hooks/useGlobals";
import { Member } from "../../lib/types/member";
import MemberService from "../services/memberService";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  const [authMember, setAuthMember] = useState<Member | null>(null);
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  useEffect(() => {
    const verifySession = async () => {
      try {
        if (!cookies.get("accessToken")) {
          localStorage.removeItem("memberData");
          setAuthMember(null);
          return;
        }

        const memberService = new MemberService();
        const verifiedMember = await memberService.getStore(); // backend verification
        setAuthMember(verifiedMember);
        localStorage.setItem("memberData", JSON.stringify(verifiedMember));
      } catch (err) {
        console.log("Session verification failed", err);
        setAuthMember(null);
        localStorage.removeItem("memberData");
      }
    };

    verifySession();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        authMember,
        setAuthMember,
        orderBuilder,
        setOrderBuilder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
