import { ButtonHTMLAttributes, Ref } from 'react';
import { ButtonSize, ButtonStyle, ButtonVariant } from '@components/common/button/buttonDefines';
import classNames from 'classnames';
import { Color } from '@defines/common/color';
import Spinner from '@components/common/spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonStyle?: ButtonStyle;
  buttonSize?: ButtonSize;
  ref?: Ref<HTMLButtonElement>;
  inProgress?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    buttonStyle = 'fill',
    buttonSize = 'big',
    className,
    children,
    inProgress = false,
    disabled,
    ...rest
  } = props;

  return (
    <>
      <button
        className={classNames(`button-${variant}`, `button-${buttonStyle}`, `button-${buttonSize}`)}
        disabled={disabled || inProgress}
        {...rest}
      >
        {inProgress ? <Spinner size={20} /> : <div className={'button-inner'}>{children}</div>}
      </button>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            transition: background 0.2s ease-in-out;
          }
        }

        .button-primary {
          &.button-fill {
            color: ${Color.WHITE};
            background: ${Color.SB100};
          }

          &.button-fill:hover {
            background: ${Color.SB60};
          }

          &.button-fill:disabled {
            color: ${Color.CG30};
            background: ${Color.CG80};
          }

          &.button-outline {
            color: ${Color.SB100};
            border: 1px solid ${Color.SB100};
            background: ${Color.WHITE};
          }

          &.button-outline:hover {
            background: ${Color.KB30};
          }

          &.button-outline:disabled {
            color: ${Color.CG30};
            background: ${Color.CG80};
          }
        }

        .button-dark {
          &.button-fill {
            color: ${Color.WHITE};
            background: ${Color.CG20};
          }

          &.button-fill:hover {
            background: ${Color.CG10};
          }

          &.button-fill:disabled {
            color: ${Color.CG30};
            background: ${Color.CG80};
          }

          &.button-outline {
            color: ${Color.CG20};
            border: 1px solid ${Color.CG20};
            background: ${Color.WHITE};
          }

          &.button-outline:hover {
            background: ${Color.CG90};
          }

          &.button-outline:disabled {
            color: ${Color.CG30};
            background: ${Color.CG80};
          }
        }

        .button-big {
          padding: 20px 25px;
        }

        .button-medium {
          padding: 15px 20px;
        }

        .button-small {
          padding: 10px 15px;
        }
      `}</style>
    </>
  );
}
