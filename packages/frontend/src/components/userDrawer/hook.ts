import { successMessage } from '@/common/message';
import { UserInfo } from '@/services/modules/user';
import { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';

interface DrawerProps {
  title: string;
  isView: boolean;
  rowData: Partial<UserInfo>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}
export const useUserInfo = () => {
  const rules = reactive({
    avatar: [{ required: true, message: '请上传用户头像' }],
    photo: [{ required: true, message: '请上传用户照片' }],
    username: [{ required: true, message: '请填写用户姓名' }],
    gender: [{ required: true, message: '请选择性别' }],
    idCard: [{ required: true, message: '请填写身份证号' }],
    email: [{ required: true, message: '请填写邮箱' }],
    address: [{ required: true, message: '请填写居住地址' }],
  });
  const drawerVisible = ref(false);
  const drawerProps = ref<DrawerProps>({
    isView: false,
    title: '',
    rowData: {},
  });
  // 接收父组件传过来的参数
  const acceptParams = (params: DrawerProps) => {
    drawerProps.value = params;
    drawerVisible.value = true;
  };
  // 提交数据（新增/编辑）
  const ruleFormRef = ref<FormInstance>();
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.rowData);
      successMessage(`${drawerProps.value.title}用户成功！`);
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
  return {
    rules,
    acceptParams,
    drawerProps,
    drawerVisible,
  };
};
