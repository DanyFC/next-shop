import { getAddress } from "@/actions/address/get_address";
import { getCountries } from "@/actions/country/get-countries";
import { auth } from "@/auth/config";
import { Provider, Title } from "@/components";
import AddressForm from "./ui/AddressForm";

export default async function AddressPage() {
  const session = await auth()

  if (!session?.user) return <span>loading</span>

  const countries = await getCountries()
  const dbAddress = await getAddress(session!.user.id)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-60 px-10 sm:px-0">
      <div className="w-full sm:w-4/5 flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />
        <Provider>
          <AddressForm countries={countries} dbAddress={dbAddress} />
        </Provider>
      </div>
    </div>
  );
}