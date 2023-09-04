import EditAccountWrapper from "./EditAccountWrapper";
import PageNavHeader from "@components/PageNavHeader";
import Input from "@components/Input";

function EditAccount() {
  return (
    <EditAccountWrapper>
      <PageNavHeader heading="Edit account" text="Save" />
      <p className="paragraph">Personal Information</p>
      <div className="personalIfo">
        <Input label="First name" />
        <Input label="Middle name" />
        <Input label="Last name" />
        <Input label="Date of Birth" type="date" />
      </div>
      <hr className="line" />
      <p className="paragraph">Address and contact information</p>
      <div className="addressIfo">
        <Input label="Country" />
        <Input label="Status" />
        <Input label="Local government" />
        <Input label="City" />
        <Input label="Address" />
        <Input label="Opay Account Number" />
      </div>
    </EditAccountWrapper>
  );
}

export default EditAccount;
