import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
  cleanup,

  // waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import * as supabaseFunctions from "../utils/supabaseFunction";

jest.mock("../utils/supabaseFunction", () => ({
  getAll: jest.fn().mockResolvedValue([]),
  deleteContent: jest.fn().mockResolvedValue(undefined),
  addContent: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("../utils/supabaseFunction");
export const addContent = jest.fn().mockResolvedValue(undefined);
export const getAll = jest
  .fn()
  .mockResolvedValue([{ id: "1", content: "テスト学習", time: 1 }]);

beforeEach(() => {
  jest.clearAllMocks();
});

// 各テストの前にクリーンアップを実行
beforeEach(() => {
  cleanup();
});

// 各テストの後にクリーンアップを実行
afterEach(() => {
  cleanup();
});

jest.setTimeout(30000); // 全てのテストのタイムアウトを30秒に設定

describe("App", () => {
  // test("タイトルが表示されること", async () => {
  //   render(<App />);
  //   // ローディング状態が終わるまで待つ
  //   await waitFor(
  //     () => {
  //       expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  //     },
  //     { timeout: 10000 }
  //   );
  //   // タイトルが表示されるのを待つ
  //   const title = await screen.findByTestId("title", {}, { timeout: 10000 });
  //   expect(title).toHaveTextContent("Study Time Record");
  // });
  // test("Loadingが表示されること", async () => {
  //   render(<App />);
  //   await waitFor(() => {
  //     const loading = screen.getByTestId("loading");
  //     expect(loading).toBeInTheDocument();
  //   });
  // });
  // test("登録ボタンがあること", async () => {
  //   render(<App />);
  //   await waitFor(() => {
  //     const submit = screen.getByTestId("submit");
  //     expect(submit).toBeInTheDocument();
  //   });
  // });
  // test("レコードがない場合、'No records found'が表示されること", async () => {
  //   (supabaseFunctions.getAll as jest.Mock).mockResolvedValue([]);
  //   render(<App />);
  //   await waitFor(
  //     () => {
  //       expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  //     },
  //     { timeout: 10000 }
  //   );
  //   expect(screen.getByText("No records found.")).toBeInTheDocument();
  // }, 15000);

  // test("レコードがある場合、テーブルが表示されること", async () => {
  //   (supabaseFunctions.getAll as jest.Mock).mockResolvedValue([
  //     { id: "1", content: "Test content", time: "1" },
  //   ]);
  //   render(<App />);
  //   await waitFor(
  //     () => {
  //       expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  //     },
  //     { timeout: 10000 }
  //   );
  //   await screen.findByTestId("table", {}, { timeout: 10000 });
  //   expect(screen.getByTestId("table")).toBeInTheDocument();
  // }, 15000);

  // test("学習内容と学習時間を登録できる", async () => {
  //   render(<App />);
  //   let initialDataRowCount: number = 0;
  //   await waitFor(() => {
  //     const initialRecords = screen.getByTestId("table").querySelectorAll("tr");
  //     initialDataRowCount = initialRecords.length - 1;
  //     expect(initialDataRowCount).toBeGreaterThanOrEqual(0);
  //   });
  //   const submitButton = screen.getByTestId("submit");
  //   fireEvent.click(submitButton);
  //   expect(screen.getByTestId("modal-title")).toBeInTheDocument();
  //   fireEvent.change(screen.getByLabelText("学習記録"), {
  //     target: { value: "テスト学習内容" },
  //   });
  //   fireEvent.change(screen.getByLabelText("学習時間"), {
  //     target: { value: "1" },
  //   });
  //   fireEvent.click(screen.getByText("登録"));
  //   await waitFor(() => {
  //     const updatedRecords = screen.getByTestId("table").querySelectorAll("tr");
  //     const updatedDataRowCount = updatedRecords.length - 1;
  //     expect(updatedDataRowCount).toBe(initialDataRowCount + 1);
  //   });
  // });
  // test("モーダルのtitleが表示される", async () => {
  //   render(<App />);
  //   await waitFor(() => {
  //     const submitButton = screen.getByTestId("submit");
  //     fireEvent.click(submitButton);
  //   });
  //   expect(screen.getByTestId("modal-title")).toBeInTheDocument();
  // });
  // test("学習内容がないときに登録するとエラーがでる", async () => {
  //   render(<App />);
  //   await waitFor(() => {
  //     const submitButton = screen.getByTestId("submit");
  //     fireEvent.click(submitButton);
  //   });
  //   screen.getByTestId("modal-title");
  //   const registerButton = screen.getByTestId("register");
  //   fireEvent.click(registerButton);
  //   await waitFor(() => {
  //     const errorMessage = screen.queryByText("学習内容の入力は必須です");
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });
  // test("学習時間がないときに登録するとエラーがでる(未入力のエラー)", async () => {
  //   render(<App />);
  //   await waitFor(() => {
  //     const submitButton = screen.getByTestId("submit");
  //     fireEvent.click(submitButton);
  //   });
  //   screen.getByTestId("modal-title");
  //   const registerButton = screen.getByTestId("register");
  //   fireEvent.click(registerButton);
  //   await waitFor(() => {
  //     const errorMessage = screen.queryByText("学習時間の入力は必須です");
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });
  // test("学習時間がないときに登録するとエラーがでる(0以上でないときのエラー)", async () => {
  //   render(<App />);
  //   await waitFor(() => {
  //     const submitButton = screen.getByTestId("submit");
  //     fireEvent.click(submitButton);
  //   });
  //   screen.getByTestId("modal-title");
  //   fireEvent.change(screen.getByLabelText("学習記録"), {
  //     target: { value: "テスト学習内容" },
  //   });
  //   fireEvent.change(screen.getByLabelText("学習時間"), {
  //     target: { value: "0" },
  //   });
  //   fireEvent.click(screen.getByText("登録"));
  //   await waitFor(() => {
  //     const errorMessage = screen.queryByText(
  //       "学習時間は0.1以上である必要があります"
  //     );
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });
  // test("削除ボタンを押すと学習記録が削除される", async () => {
  //   const mockRecords = [
  //     { id: "1", content: "Test 1", time: "1" },
  //     { id: "2", content: "Test 2", time: "2" },
  //   ];
  //   jest
  //     .spyOn(supabaseFunctions, "getAll")
  //     .mockResolvedValueOnce(mockRecords)
  //     .mockResolvedValueOnce(mockRecords.slice(1));
  //   jest.spyOn(supabaseFunctions, "deleteContent").mockResolvedValue(undefined);
  //   render(<App />);
  //   await waitFor(() => {
  //     expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByTestId("table")).toBeInTheDocument();
  //   });
  //   // 初期レコード数を確認
  //   const initialRows = screen.getAllByRole("row");
  //   const initialDataRowCount = initialRows.length - 1;
  //   expect(initialDataRowCount).toBe(mockRecords.length);
  //   const deleteButtons = screen.getAllByTestId("delete");
  //   fireEvent.click(deleteButtons[0]);
  //   // deleteContent関数が呼ばれたことを確認
  //   expect(supabaseFunctions.deleteContent).toHaveBeenCalledWith("1");
  //   await waitFor(
  //     () => {
  //       const updatedRows = screen.getAllByRole("row");
  //       const updatedDataRowCount = updatedRows.length - 1;
  //       expect(updatedDataRowCount).toBe(initialDataRowCount - 1);
  //     },
  //     { timeout: 5000 }
  //   );
  // });
  // test("モーダルのtitleが記録編集である", async () => {
  //   render(<App />);
  //   // ローディングが終わるのを待つ
  //   await screen.findByTestId("title");
  //   // "登録をする"ボタンをクリック
  //   const submitButton = screen.getByTestId("submit");
  //   fireEvent.click(submitButton);
  //   // フォームに値を入力
  //   const contentInput = screen.getByPlaceholderText("学習した内容を記入");
  //   const timeInput = screen.getByPlaceholderText("学習した時間を記入");
  //   fireEvent.change(contentInput, { target: { value: "テスト学習" } });
  //   fireEvent.change(timeInput, { target: { value: "1" } });
  //   // 登録ボタンをクリック
  //   const registerButton = screen.getByTestId("register");
  //   fireEvent.click(registerButton);
  //   // 編集ボタンが表示されるまで待つ
  //   const editButton = await screen.findByTestId(
  //     "edit",
  //     {},
  //     { timeout: 10000 }
  //   );
  //   // 編集ボタンをクリック
  //   fireEvent.click(editButton);
  //   // モーダルのタイトルが "記録編集" であることを確認
  //   expect(screen.getByTestId("modal-title")).toHaveTextContent("記録編集");
  // });

  // test("モーダルのtitleが記録編集である", async () => {
  //   (supabaseFunctions.getAll as jest.Mock).mockResolvedValue([
  //     { id: "1", content: "Test content", time: "1" },
  //   ]);

  //   console.log("レンダリング直後のDOM:", document.body.innerHTML);

  //   await act(async () => {
  //     render(<App />);
  //   });

  //   await waitFor(
  //     () => {
  //       expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  //     },
  //     { timeout: 10000 }
  //   );

  //   let tableElement: HTMLElement | null = null;
  //   await act(async () => {
  //     tableElement = await screen.findByTestId("table", {}, { timeout: 10000 });
  //   });

  //   if (tableElement) {
  //     console.log("テーブル要素のテキスト内容:", tableElement.textContent);
  //     console.log("テーブル要素の子要素数:", tableElement.childElementCount);
  //   } else {
  //     console.log("テーブル要素が見つかりませんでした");
  //   }

  //   expect(screen.getByTestId("table")).toBeInTheDocument();

  //   // 編集ボタンが表示されるのを待つ
  //   const editButton = await screen.findByTestId("edit");
  //   console.log("編集ボタンが見つかりました");

  //   fireEvent.click(editButton);
  //   console.log("編集ボタンがクリックされました");

  //   // モーダルのタイトルが "記録編集" であることを確認
  //   expect(screen.getByTestId("modal-title")).toHaveTextContent("記録編集");
  //   console.log("テスト完了");
  // }, 15000);

  test("新しい内容を追加する", async () => {
    const initialRecord = { id: "1", content: "テスト学習", time: 1 };
    const updatedRecord = { id: "2", content: "更新後のテスト", time: 2 };

    const mockedSupabaseFunctions = supabaseFunctions as jest.Mocked<
      typeof supabaseFunctions
    >;

    mockedSupabaseFunctions.getAll
      .mockResolvedValueOnce([initialRecord])
      .mockResolvedValueOnce([initialRecord, updatedRecord]);
    mockedSupabaseFunctions.addContent.mockResolvedValue([updatedRecord]);

    await act(async () => {
      render(<App />);
    });

    // 登録ボタンをクリックしてモーダルを開く
    const registerButton = screen.getByTestId("submit");
    fireEvent.click(registerButton);

    // モーダルが開いたことを確認
    const modalTitle = await screen.findByTestId("modal-title");
    expect(modalTitle).toHaveTextContent("新学習を記録する");

    // 入力フィールドに新しい値を設定
    const contentInput = screen.getByPlaceholderText("学習した内容を記入");
    const timeInput = screen.getByPlaceholderText("学習した時間を記入");

    fireEvent.change(contentInput, { target: { value: "更新後のテスト" } });
    fireEvent.change(timeInput, { target: { value: "2" } });

    // 登録ボタンをクリック
    const submitButton = screen.getByTestId("register");
    fireEvent.click(submitButton);

    // addContentが呼ばれたことを確認
    await waitFor(() => {
      expect(mockedSupabaseFunctions.addContent).toHaveBeenCalledWith(
        "更新後のテスト",
        2
      );
    });

    // UIが更新されたことを確認
    await waitFor(() => {
      expect(screen.getByText("更新後のテスト")).toBeInTheDocument();
    });

    console.log("テスト完了");
  }, 15000);
});
