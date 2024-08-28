import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../redux/contacts/selectors";
import { selectIsAuthLoading } from "../../../redux/auth/selectors";
import Text from "../Text/Text";
import { Circles } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);
  const isAuthLoading = useSelector(selectIsAuthLoading);

  const buildContactOperationMessage = () => {
    switch (isLoading) {
      case "adding-contact":
        return "Adding a new contact. Please, wait.";
      case "deleting-contact":
        return "Deleting the contact. Please, wait.";
      case "updating-contact":
        return "Updating the contact. Please, wait.";
      case "fetching-contacts":
        return "Refreshing contacts. Please, wait.";
      default:
        return "Please, wait";
    }
  };

  const buildAuthOperationMessage = () => {
    switch (isAuthLoading) {
      case "registering":
        return "Registering you. Please, wait";
      case "logining":
        return "Logining. Please, wait.";
      case "logining-out":
        return "Logining out. Please, wait.";
      case "refreshing":
        return "Refreshing data. Please, wait.";
      default:
        return "Please, wait";
    }
  };

  return (
    (isLoading || isAuthLoading) && (
      <div className={css.backdrop}>
        <div className={css["loader-group"]}>
          <Text isLoaderText isCentered>
            {isLoading
              ? buildContactOperationMessage()
              : isAuthLoading
              ? buildAuthOperationMessage()
              : "Loading page"}
          </Text>
          <Circles color="var(--first-color)" />
        </div>
      </div>
    )
  );
};

export default Loader;
