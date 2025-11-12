import { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";

type Props = {
  filtersList: string[];
  onFilterSelect: (filter: string | null) => void;
};

const CoursesFilters = ({ filtersList, onFilterSelect }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleFilter = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      onFilterSelect(null);
    } else {
      setActiveIndex(index);
      onFilterSelect(filtersList[index]);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      className="flex-row w-full my-4"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {filtersList.map((f, index) => (
        <Pressable
          key={index}
          onPress={() => handleFilter(index)}
          className={`${activeIndex === index ? "bg-white" : "bg-neutral-800"} rounded-md px-5 py-2 mr-3`}
        >
          <Text className={`font-medium ${activeIndex === index ? "text-black" : "text-white"}`}>
            {f}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default CoursesFilters;