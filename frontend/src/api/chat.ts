import { env } from "../env";


export default class ChatsApi {
  static async initConversation(fromId: number, toId: number) {
    try {
      const res = await fetch(`${env.BACK_URL}/privateMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ fromId, toId }),
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
  static async getConversationMessages(conversationId: number) {
    try {
      const res = await fetch(
        `${env.BACK_URL}/privateMessage/${conversationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();
      return data;
    } catch (error) {}
  }
  static async getUserConversations(userId: number) {
    try {
      const res = await fetch(
        `${env.BACK_URL}/privateMessage/routes/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
