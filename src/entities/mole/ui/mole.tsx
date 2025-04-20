import styles from './mole.module.scss';

type MoleProps = {
  isActive: boolean;
  onClick: (active: boolean) => void;
};

const Mole = ({ isActive, onClick }: MoleProps) => {
  return (
    <div
      className={`${styles.mole} ${isActive ? styles.active : ''}`}
      onClick={() => onClick(isActive)}
    />
  );
};

export default Mole;
