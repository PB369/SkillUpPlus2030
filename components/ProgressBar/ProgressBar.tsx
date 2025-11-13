import { View } from "react-native";

type Props = {
  progressPercentage: number,
  widthInPercentage?: number,
  height?: number,
  bgOfFrontBar?: string,
  bgOfBackBar?: string,
  borderRadius?: number,
  borderWidth?: number,
  marginBottom?: number,
  children?: React.ReactNode,
}

const ProgressBar = ({progressPercentage, widthInPercentage, height, borderRadius, borderWidth, bgOfFrontBar, bgOfBackBar, marginBottom, children}: Props) => {
  const barHeight = height ? height : 12;
  const barWidth = widthInPercentage ? widthInPercentage : 100;
  const bgOfFront = bgOfFrontBar ? bgOfFrontBar : '#facc15';
  const bgOfBack = bgOfBackBar ? bgOfBackBar : 'black';
  const barRadius = borderRadius ? borderRadius : 6;
  const marginOfBSide = marginBottom ? marginBottom : 0;
  const borderWid = borderWidth ? borderWidth : 0;

  return (
    <View 
      className={`w-full flex flex-row justify-center items-center`}
      style={{marginBottom: marginOfBSide}}
    >
      <View 
        className={`overflow-hidden rounded-md`} 
        style={{
          width: `${barWidth}%`,
          height: barHeight, 
          backgroundColor: bgOfBack,
          borderRadius: barRadius,
          borderWidth: borderWid,
        }}
      >
        <View 
          className={`h-full bg-[${bgOfFront}] rounded-md`} 
          style={{
            width: `${progressPercentage}%`, 
            backgroundColor: bgOfFront,
            borderRadius: barRadius,
          }}
        />
      </View>
      {children}
    </View>
  )
}

export default ProgressBar;