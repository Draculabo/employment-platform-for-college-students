<script setup lang="ts">
import renderDialog from '@/components/renderDialog.vue';
import { Codemirror } from 'vue-codemirror';
import { cssLanguage } from '@codemirror/lang-css';
import { marks } from './constant';
import { step, setStep, useAvatar, usePrimaryBGColor, useCustomFont, useCustomCSS, usePrimaryColor, useAutoOnePage } from './hook';
import { useMarkdownContent, useResumeType, useReviewResume } from '../../hook';

const emits = defineEmits(['upload-avatar']);
const props = defineProps<{ resumeProps: { content: string; resumeType: string } }>();

const { autoOnePage, setAutoOnePage } = useAutoOnePage(props.resumeProps.resumeType);
const { cssDialog, cssText, toggleDialog, setStyle, removeStyle } = useCustomCSS(props.resumeProps.resumeType);
const { color, setColor } = usePrimaryColor(props.resumeProps.resumeType);
const { fontOptions, font, setFont } = useCustomFont(props.resumeProps.resumeType);
const { setAvatar } = useAvatar(emits);
const { primaryColor, setPrimaryColor } = usePrimaryBGColor(props.resumeProps.resumeType);
const { content: reviewContent, reviewResume } = useReviewResume();

const { resumeType } = useResumeType();
const { content } = useMarkdownContent(resumeType);
const extentions = [cssLanguage];
</script>

<template>
  <div class="operator">
    <el-slider size="small" class="slider" :marks="marks" v-model="step" @change="setStep" :step="10" show-stops />
    <div class="operator-level2">
      <el-popover title="点评结果" width="700" placement="bottom" trigger="click" :content="reviewContent">
        <template #reference>
          <button class="btn custom_css operator-item" @click="() => reviewResume(content)">简历点评</button>
        </template>
      </el-popover>
      <el-tooltip content="上传前请确保你想上传的位置在编辑器中存在 ![个人头像](...) 此关键字">
        <label for="upload-avatar" class="btn upload_avatar operator-item">上传证件照</label>
      </el-tooltip>
      <input type="file" id="upload-avatar" accept=".png,.jpg,.jpeg" @change="setAvatar" />
      <button class="btn custom_css operator-item" @click="toggleDialog">DIY简历</button>
      <label for="primary-color">字体颜色</label>
      <el-color-picker id="primary-color" class="operator-item" @change="setColor" size="small" v-model="color" />
      &nbsp;&nbsp;
      <label for="primary-color">主色调</label>
      <el-color-picker id="primary-bg-color" class="operator-item" @change="setPrimaryColor" size="small" v-model="primaryColor" />
      <el-tooltip content="自动一页" placement="bottom">
        <el-switch class="operator-item" size="small" @change="setAutoOnePage" v-model="autoOnePage" />
      </el-tooltip>
      <el-select v-model="font" class="operator-item" @change="setFont" placement="bottom" size="small">
        <el-option v-for="item in fontOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
  <!-- 弹出框 -->
  <renderDialog
    confirm-text="设置样式"
    reset-text="重置样式"
    title="你可以在这里编写CSS样式，让它作用在简历上！"
    :flag="cssDialog"
    @confirm="setStyle"
    @cancel="removeStyle"
  >
    <codemirror
      v-model="cssText"
      :autofocus="true"
      :style="{ height: '500px' }"
      :indent-with-tab="true"
      :extensions="extentions"
      placeholder="格式如.jufe h2 { color: red; }"
    />
  </renderDialog>
</template>

<style lang="scss" scoped>
.operator {
  width: 210mm;
  margin: 0 auto;
  position: sticky;
  top: 0;
  transform: translateY(-20px);
  z-index: 1;
  background: var(--bg-theme);

  .slider {
    width: 100%;
    user-select: none;
  }

  .operator-level2 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 5px;
    label {
      &[for='primary-color'],
      &[for='primary-bg-color'] {
        color: #eee;
        font-size: 12px;
        margin-right: 5px;
      }
    }
    .operator-item {
      margin: 20px 10px 0 10px;
    }

    .primary-bg-color {
      margin-right: 10px;
    }

    #upload-avatar {
      width: 0;
      height: 0;
      margin-right: -10px;
    }
  }

  .custom_css,
  .upload_avatar {
    font-size: 0.7rem;
    cursor: pointer;
    padding: 3px 10px;
    color: white;
    background: var(--theme);
  }
}
</style>
