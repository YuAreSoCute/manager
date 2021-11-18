<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="专利号" prop="applyId">
        <el-input
          v-model="queryParams.applyId"
          placeholder="请输入专利号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专利名称" prop="applyName">
        <el-input
          v-model="queryParams.applyName"
          placeholder="请输入专利名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="缴费日期" prop="applyDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.applyDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择缴费日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="金额" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费用名称" prop="priceName">
        <el-input
          v-model="queryParams.priceName"
          placeholder="请输入费用名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0等待提示 1提示成功 2提示失败   3存在错误" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入0等待提示 1提示成功 2提示失败   3存在错误"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="送给谁" prop="toName">
        <el-input
          v-model="queryParams.toName"
          placeholder="请输入送给谁"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="错误消息" prop="msg">
        <el-input
          v-model="queryParams.msg"
          placeholder="请输入错误消息"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="openid" prop="openId">
        <el-input
          v-model="queryParams.openId"
          placeholder="请输入openid"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['manager:mailInfo:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['manager:mailInfo:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manager:mailInfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['manager:mailInfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mailInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="openid" align="center" prop="mailInfoId" />
      <el-table-column label="专利号" align="center" prop="applyId" />
      <el-table-column label="专利名称" align="center" prop="applyName" />
      <el-table-column label="缴费日期" align="center" prop="applyDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center" prop="price" />
      <el-table-column label="费用名称" align="center" prop="priceName" />
      <el-table-column label="0等待提示 1提示成功 2提示失败   3存在错误" align="center" prop="state" />
      <el-table-column label="送给谁" align="center" prop="toName" />
      <el-table-column label="送给谁的邮箱" align="center" prop="toMail" />
      <el-table-column label="错误消息" align="center" prop="msg" />
      <el-table-column label="openid" align="center" prop="openId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:mailInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:mailInfo:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改mailInfo对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="专利号" prop="applyId">
          <el-input v-model="form.applyId" placeholder="请输入专利号" />
        </el-form-item>
        <el-form-item label="专利名称" prop="applyName">
          <el-input v-model="form.applyName" placeholder="请输入专利名称" />
        </el-form-item>
        <el-form-item label="缴费日期" prop="applyDate">
          <el-date-picker clearable size="small"
            v-model="form.applyDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择缴费日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="金额" prop="price">
          <el-input v-model="form.price" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="费用名称" prop="priceName">
          <el-input v-model="form.priceName" placeholder="请输入费用名称" />
        </el-form-item>
        <el-form-item label="0等待提示 1提示成功 2提示失败   3存在错误" prop="state">
          <el-input v-model="form.state" placeholder="请输入0等待提示 1提示成功 2提示失败   3存在错误" />
        </el-form-item>
        <el-form-item label="送给谁" prop="toName">
          <el-input v-model="form.toName" placeholder="请输入送给谁" />
        </el-form-item>
        <el-form-item label="送给谁的邮箱" prop="toMail">
          <el-input v-model="form.toMail" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="错误消息" prop="msg">
          <el-input v-model="form.msg" placeholder="请输入错误消息" />
        </el-form-item>
        <el-form-item label="openid" prop="openId">
          <el-input v-model="form.openId" placeholder="请输入openid" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMailInfo, getMailInfo, delMailInfo, addMailInfo, updateMailInfo, exportMailInfo } from "@/api/manager/mailInfo";

export default {
  name: "MailInfo",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // mailInfo表格数据
      mailInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        applyId: null,
        applyName: null,
        applyDate: null,
        price: null,
        priceName: null,
        state: null,
        toName: null,
        toMail: null,
        msg: null,
        openId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询mailInfo列表 */
    getList() {
      this.loading = true;
      listMailInfo(this.queryParams).then(response => {
        this.mailInfoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        mailInfoId: null,
        applyId: null,
        applyName: null,
        applyDate: null,
        price: null,
        priceName: null,
        state: null,
        toName: null,
        toMail: null,
        msg: null,
        openId: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.mailInfoId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加mailInfo";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const mailInfoId = row.mailInfoId || this.ids
      getMailInfo(mailInfoId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改mailInfo";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.mailInfoId != null) {
            updateMailInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMailInfo(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const mailInfoIds = row.mailInfoId || this.ids;
      this.$confirm('是否确认删除mailInfo编号为"' + mailInfoIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMailInfo(mailInfoIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有mailInfo数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportMailInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
