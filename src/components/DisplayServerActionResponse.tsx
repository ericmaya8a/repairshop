import { MessageBox } from "./MessageBox";

interface DisplayServerActionResponseProps {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
}

export function DisplayServerActionResponse({
  result,
}: DisplayServerActionResponseProps) {
  const { data, serverError, validationErrors } = result;

  return (
    <>
      {data?.message ? (
        <MessageBox type="success" content={`Success: ${data.message}`} />
      ) : null}

      {serverError ? <MessageBox type="error" content={serverError} /> : null}

      {validationErrors ? (
        <MessageBox
          type="error"
          content={Object.keys(validationErrors).map((key) => (
            <p key={key}>{`${key}: ${
              validationErrors[key as keyof typeof validationErrors]
            }`}</p>
          ))}
        />
      ) : null}
    </>
  );
}
