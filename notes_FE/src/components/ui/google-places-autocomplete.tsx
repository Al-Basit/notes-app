import Autocomplete from "react-google-autocomplete";
import {
    FieldValues,
    useController,
    UseControllerProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";
type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
    name: string;
    placeholder?: string;
    isDisabled?: boolean;
    maxLength?: number;
    min?: number | undefined | string;
    max?: number | undefined | string;
    form: any;
    defaultValue?: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;
const BaseLocation = <T extends FieldValues>({
    control,
    name,
    placeholder,
    rules = {},
    form,
}: Props<T>) => {
    const {
        fieldState: { error },
    } = useController<T>({ name, control, rules });
    return (
        <>
            <Autocomplete
                apiKey={"AIzaSyBWgrqXm8f23ir4QTLMBzwZX-MyJ3T6vNQ"}
                ref={null}
                defaultValue={form.watch(`${name}.streetAddress`)}
                onPlaceSelected={(place) => {
                    form.setValue(`${name}.latitude`, place.geometry?.location?.lat() ? String(place.geometry?.location?.lat()): "");
                    form.setValue(`${name}.longitude`, place.geometry?.location?.lng() ? String(place.geometry?.location?.lng()): "");
                    form.setValue(`${name}.streetAddress`, place.formatted_address);
                    const components = place.address_components;

                    if (components) {
                        const getComponent = (type: string) =>
                            components.find((component) => component.types.includes(type))?.long_name;

                        // Extract and set city, area, and country
                        form.setValue(`${name}.city`, getComponent("locality")); // City
                        form.setValue(`${name}.area`, getComponent("administrative_area_level_1")); // State/Region
                        form.setValue(`${name}.country`, getComponent("country")); // Country

                        // Set postal code
                        form.setValue(`${name}.postalCode`, getComponent("postal_code"));
                    }
                }}
                onChange={() => {
                    form.setValue(`${name}.latitude`, "0");
                    form.setValue(`${name}.longitude`, "0");
                }}
                options={{
                    types: ["geocode", "establishment"], // Allow both residential and commercial addresses
                    componentRestrictions: { country: [] }, // Empty array to allow all countries
                }}
                placeholder={placeholder ? placeholder : `Enter your ${name}`}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                )}
            />
            {error && (
                <p className="mt-1 text-xs text-destructive">
                    {error.message || "Error"}
                </p>
            )}
        </>
    );
};

export default BaseLocation;