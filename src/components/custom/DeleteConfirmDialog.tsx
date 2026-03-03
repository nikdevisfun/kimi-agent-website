import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  websiteName: string;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  websiteName,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-sm" onClick={e => e.stopPropagation()}>
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white text-center mb-2">
          确认删除
        </h3>
        <p className="text-white/60 text-center mb-6">
          确定要删除 <span className="text-white font-medium">{websiteName}</span> 吗？
          <br />
          此操作无法撤销。
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="glass-button"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-xl bg-red-500/80 hover:bg-red-500 text-white font-medium transition-all duration-300 border border-red-400/50"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
}
