import { createContext, useContext, useState, ReactNode } from "react";

interface Payment {
  id: string;
  ticketId: string;
  customer: string;
  amount: string;
  amountNum: number;
  method: string;
  methodKey: string;
  date: string;
  time: string;
  staff: string;
  status: string;
}

interface PaymentContextType {
  payments: Payment[];
  updatePaymentStatus: (ticketId: string, newStatus: string) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "TT001234",
      ticketId: "VE001234",
      customer: "Nguyễn Văn Minh",
      amount: "420,000",
      amountNum: 420000,
      method: "Tiền mặt",
      methodKey: "cash",
      date: "2026-04-02",
      time: "14:30",
      staff: "Nguyễn Văn An",
      status: "Đã thanh toán",
    },
    {
      id: "TT001235",
      ticketId: "VE001235",
      customer: "Trần Thị Lan",
      amount: "380,000",
      amountNum: 380000,
      method: "Chuyển khoản",
      methodKey: "transfer",
      date: "2026-04-02",
      time: "14:25",
      staff: "Nguyễn Văn An",
      status: "Đã thanh toán",
    },
    {
      id: "TT001236",
      ticketId: "VE001236",
      customer: "Lê Hoàng Nam",
      amount: "120,000",
      amountNum: 120000,
      method: "Tiền mặt",
      methodKey: "cash",
      date: "2026-04-02",
      time: "14:20",
      staff: "Nguyễn Văn An",
      status: "Đã thanh toán",
    },
    {
      id: "TT001237",
      ticketId: "VE001237",
      customer: "Phạm Thị Hương",
      amount: "320,000",
      amountNum: 320000,
      method: "Chuyển khoản",
      methodKey: "transfer",
      date: "2026-04-02",
      time: "14:15",
      staff: "Trần Thị Bình",
      status: "Đã thanh toán",
    },
    {
      id: "TT001238",
      ticketId: "VE001238",
      customer: "Võ Văn Tân",
      amount: "420,000",
      amountNum: 420000,
      method: "Tiền mặt",
      methodKey: "cash",
      date: "2026-04-02",
      time: "14:10",
      staff: "Nguyễn Văn An",
      status: "Đã thanh toán",
    },
    {
      id: "TT001239",
      ticketId: "VE001239",
      customer: "Đặng Thị Mai",
      amount: "380,000",
      amountNum: 380000,
      method: "Chuyển khoản",
      methodKey: "transfer",
      date: "2026-04-02",
      time: "14:05",
      staff: "Lê Văn Cường",
      status: "Đã thanh toán",
    },
    {
      id: "TT001240",
      ticketId: "VE001240",
      customer: "Hoàng Văn Đức",
      amount: "120,000",
      amountNum: 120000,
      method: "Tiền mặt",
      methodKey: "cash",
      date: "2026-04-02",
      time: "13:55",
      staff: "Nguyễn Văn An",
      status: "Đã thanh toán",
    },
    {
      id: "TT001241",
      ticketId: "VE001241",
      customer: "Bùi Thị Ngọc",
      amount: "420,000",
      amountNum: 420000,
      method: "Chuyển khoản",
      methodKey: "transfer",
      date: "2026-04-02",
      time: "13:50",
      staff: "Trần Thị Bình",
      status: "Đã thanh toán",
    },
    {
      id: "TT001242",
      ticketId: "VE001242",
      customer: "Ngô Văn Hùng",
      amount: "180,000",
      amountNum: 180000,
      method: "Tiền mặt",
      methodKey: "cash",
      date: "2026-04-02",
      time: "13:45",
      staff: "Lê Văn Cường",
      status: "Đã thanh toán",
    },
    {
      id: "TT001243",
      ticketId: "VE001243",
      customer: "Lý Thị Thu",
      amount: "380,000",
      amountNum: 380000,
      method: "Chuyển khoản",
      methodKey: "transfer",
      date: "2026-04-02",
      time: "13:40",
      staff: "Nguyễn Văn An",
      status: "Đã thanh toán",
    },
    {
      id: "TT001244",
      ticketId: "VE001244",
      customer: "Mai Văn Khoa",
      amount: "350,000",
      amountNum: 350000,
      method: "Tiền mặt",
      methodKey: "cash",
      date: "2026-04-02",
      time: "13:35",
      staff: "Trần Thị Bình",
      status: "Đã thanh toán",
    },
    {
      id: "TT001245",
      ticketId: "VE001245",
      customer: "Dương Thị Lan",
      amount: "420,000",
      amountNum: 420000,
      method: "Chuyển khoản",
      methodKey: "transfer",
      date: "2026-04-02",
      time: "13:30",
      staff: "Lê Văn Cường",
      status: "Đã thanh toán",
    },
    {
      id: "TT001201",
      ticketId: "VE001201",
      customer: "Trương Văn Phong",
      amount: "420,000",
      amountNum: 420000,
      method: "Tiền mặt",
      methodKey: "cash",
      date: "2026-04-01",
      time: "15:20",
      staff: "Nguyễn Văn An",
      status: "Đã thanh toán",
    },
    {
      id: "TT001202",
      ticketId: "VE001202",
      customer: "Phan Thị Hồng",
      amount: "120,000",
      amountNum: 120000,
      method: "Chuyển khoản",
      methodKey: "transfer",
      date: "2026-04-01",
      time: "15:10",
      staff: "Trần Thị Bình",
      status: "Đã thanh toán",
    },
    {
      id: "TT001203",
      ticketId: "VE001203",
      customer: "Vũ Văn Hải",
      amount: "380,000",
      amountNum: 380000,
      method: "Tiền mặt",
      methodKey: "cash",
      date: "2026-04-01",
      time: "14:50",
      staff: "Lê Văn Cường",
      status: "Đã thanh toán",
    },
  ]);

  const updatePaymentStatus = (ticketId: string, newStatus: string) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.ticketId === ticketId
          ? { ...payment, status: newStatus }
          : payment
      )
    );
  };

  return (
    <PaymentContext.Provider value={{ payments, updatePaymentStatus }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
