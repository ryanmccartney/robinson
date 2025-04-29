import { useId } from "react";
import { NumberField } from "@base-ui-components/react/number-field";
import styles from "./NumberInput.module.css";

const NumberInput = ({
    defaultValue,
    min = 0,
    max,
    onChange = () => {},
    disabled,
}) => {
    const id = useId();
    return (
        <NumberField.Root
            onValueChange={onChange}
            disabled={disabled}
            smallStep={1}
            allowWheelScrub
            id={id}
            min={min}
            max={max}
            defaultValue={defaultValue}
            className={styles.Field}
        >
            <NumberField.ScrubArea className={styles.ScrubArea}>
                <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
                    <CursorGrowIcon />
                </NumberField.ScrubAreaCursor>
            </NumberField.ScrubArea>

            <NumberField.Group className={styles.Group}>
                {disabled ? null : (
                    <NumberField.Decrement className={styles.Decrement}>
                        <MinusIcon />
                    </NumberField.Decrement>
                )}
                <NumberField.Input className={styles.Input} />
                {disabled ? null : (
                    <NumberField.Increment className={styles.Increment}>
                        <PlusIcon />
                    </NumberField.Increment>
                )}
            </NumberField.Group>
        </NumberField.Root>
    );
};

const CursorGrowIcon = (props) => {
    return (
        <svg
            width="26"
            height="14"
            viewBox="0 0 24 14"
            fill="black"
            stroke="white"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
        </svg>
    );
};

const PlusIcon = (props) => {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.6"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
        </svg>
    );
};

const MinusIcon = (props) => {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.6"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0 5H10" />
        </svg>
    );
};

export default NumberInput;
