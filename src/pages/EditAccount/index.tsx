import React from "react";
import EditAccountWrapper from "./EditAccountWrapper";
import PageNavHeader from "@components/PageNavHeader";

function EditAccount() {
  return (
    <EditAccountWrapper>
      <PageNavHeader heading="Edit account" text="Save" />
    </EditAccountWrapper>
  );
}

export default EditAccount;
