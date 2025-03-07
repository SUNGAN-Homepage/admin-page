import { client } from "./api";

// 이벤트 목록 불러오기
export const fetchEvents = async (pathname: string) => {
  const apiUrl =
    pathname === "/admin/events"
      ? `/api/v1/portfolio?type=event`
      : `/api/v1/portfolio?type=profile`;
  const { data } = await client.get(apiUrl);
  return data;
};

// 이미지 업로드 함수
export const uploadEvent = async ({
  images,
  postData,
  isEdit = false,
  pathname,
}: {
  images: (File | { preview: string })[];
  isEdit?: boolean;
  pathname: string;
  postData: {
    portfolioId?: number;
    url: string[];
    title: string;
    description: string;
    date: string;
  };
}) => {
  const uploadPromises = images.map((image) => {
    const apiUrl =
      pathname === "/admin/events"
        ? `/api/v1/image/upload/event`
        : `/api/v1/image/upload/profile`;
    if (image instanceof File) {
      return client.post(
        apiUrl,
        { file: image },
        { headers: { "Content-Type": "multipart/form-data" } },
      );
    } else {
      return Promise.resolve({ data: image.preview });
    }
  });

  const results = await Promise.all(uploadPromises);
  const urls = results.map((res) => res.data);

  // 이벤트 업로드 또는 수정 요청
  if (isEdit) {
    return client.put(`/api/v1/portfolio`, { ...postData, url: urls });
  } else if (pathname === "/admin/events") {
    return client.post(`/api/v1/portfolio/event`, { ...postData, url: urls });
  } else if (pathname === "/admin/profile") {
    return client.post(`/api/v1/portfolio/profile`, { ...postData, url: urls });
  }
};

export const deleteEvent = async (id: number) => {
  return await client.delete("/api/v1/portfolio", {
    data: {
      portfolioId: id, // DELETE 요청 body에 넣을 데이터
    },
  });
};
