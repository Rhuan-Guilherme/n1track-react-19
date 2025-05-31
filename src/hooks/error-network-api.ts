import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface useErrorNetworkApiProps {
  isError: boolean;
  failureCount: number;
  error: Error | unknown;
}

export function useErrorNetworkApi({
  error,
  failureCount,
  isError,
}: useErrorNetworkApiProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isError &&
      failureCount >= 3 &&
      error instanceof Error &&
      error?.message === "Network Error"
    ) {
      console.error(error);
      toast(
        "Desculpe, o sistema está com problemas no servidor! Tente novamente mais tarde.",
      );
      setTimeout(() => {
        localStorage.clear();
        navigate("/sing-in");
      }, 3000);
    }
  }, [isError, failureCount, error, navigate]);
}
