import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Heading,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
  Input,
  FormErrorMessage,
  Flex,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { Record } from "./domain/record";
import { addContent, deleteContent, getAll } from "./utils/supabaseFunction";
import React from "react";

type FormData = {
  content: string;
  time: number;
  id?: string;
};

function App() {
  const [record, setRecord] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editRecord, setEditRecord] = useState<Record | null>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      content: "",
      time: undefined,
    },
  });

  // const watchedFields = watch();

  // // デバッグ用のuseEffect
  // useEffect(() => {
  //   console.log("Watched fields:", watchedFields);
  //   console.log("Errors:", errors);
  // }, [watchedFields, errors]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const onRegisterRecord: SubmitHandler<FormData> = async (data) => {
    try {
      await addContent(data.content, data.time);
      const suparecords = await getAll();

      setRecord(suparecords);
      onClose();
      reset();
      setEditRecord(null);
    } catch (error) {
      console.log("Error occured when registering content", error);
    }
  };

  const handleEdit = async (id: string) => {
    const editRecord = record.find((record) => record.id === id);
    if (editRecord) {
      setValue("content", editRecord.content);
      setValue("time", editRecord.time);
      setEditRecord(editRecord);
      setValue("id", editRecord.id);
      onOpen();
    } else {
      console.error(`Record with ID ${id} not found`);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    await deleteContent(id);
    const suparecords = await getAll();
    setRecord(suparecords);
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const recordData = await getAll();
        setRecord(recordData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllData();
  }, []);

  if (isLoading) {
    return <Spinner data-testid="loading" />;
  }

  return (
    <>
      <Box minHeight="100vh" height="100vh" p={4}>
        <Flex maxWidth="1600px" mx="auto" width="100%">
          <VStack
            width="33%"
            alignItems="center"
            justifyContent="space-between"
            spacing={8}
            pr={8}
            py={12}
            height="100%"
          >
            <Box />
            <Heading
              as="h1"
              size="2xl"
              color="gray.400"
              textAlign="center"
              noOfLines={1}
              data-testid="title"
            >
              Study Time Record
            </Heading>

            <Button
              onClick={onOpen}
              data-testid="submit"
              leftIcon={<FaCheck />}
              colorScheme="blue"
              size="md"
              width="auto"
              px={6}
              my={10}
            >
              登録をする
            </Button>
            <Box />
          </VStack>
          <Box position="fixed" bottom="6" left="6" zIndex="docked">
            <Button
              onClick={toggleColorMode}
              leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            >
              {colorMode === "light" ? "" : ""}
            </Button>
          </Box>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <form onSubmit={handleSubmit(onRegisterRecord)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader data-testid="modal-title">
                  {editRecord ? "記録編集" : "新学習を記録する"}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl isInvalid={!!errors.content}>
                    <FormLabel>学習記録</FormLabel>
                    <Controller
                      name="content"
                      control={control}
                      rules={{
                        required: "学習内容の入力は必須です",
                        validate: (value) =>
                          value.trim() !== "" || "空白のみの入力は無効です",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          ref={initialRef}
                          placeholder="学習した内容を記入"
                          onChange={(e) => {
                            field.onChange(e);
                            setValue("content", e.target.value);
                          }}
                        />
                      )}
                    />
                    <FormErrorMessage>
                      {errors.content && errors.content.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={!!errors.time}>
                    <FormLabel>学習時間</FormLabel>
                    <Controller
                      name="time"
                      control={control}
                      rules={{
                        required: "学習時間の入力は必須です",
                        min: {
                          value: 0.1,
                          message: "学習時間は0.1以上である必要があります",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="学習した時間を記入"
                          type="number"
                          step="0.1"
                          onChange={(e) => {
                            field.onChange(e);
                            const value = e.target.value
                              ? parseFloat(e.target.value)
                              : "";
                            field.onChange(value);
                          }}
                        />
                      )}
                    />
                    <FormErrorMessage>
                      {errors.time && errors.time.message}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    data-testid="register"
                    // isDisabled={
                    //   !watchedFields.content ||
                    //   !watchedFields.time ||
                    //   watchedFields.time <= 0
                    // }
                  >
                    登録
                  </Button>
                  <Button
                    onClick={() => {
                      reset();
                      onClose();
                    }}
                  >
                    キャンセル
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
          <Box
            width="67%"
            pl={8}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="lg"
          >
            {record.length === 0 ? (
              <p>No records found.</p>
            ) : (
              <TableContainer>
                <Table variant="simple" data-testid="table">
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Time</Th>
                      <Th></Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {record.map((record) => (
                      <Tr key={record.id}>
                        <Td>{record.content}</Td>
                        <Td>{record.time}</Td>
                        <Td>
                          <Button
                            onClick={() => handleDelete(record.id)}
                            data-testid="delete"
                            variant="outline"
                            colorScheme="red"
                          >
                            削除
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            onClick={() => handleEdit(record.id)}
                            data-testid="edit"
                            role="button"
                            aria-label="編集"
                            variant="outline"
                            colorScheme="teal"
                          >
                            編集
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default App;
