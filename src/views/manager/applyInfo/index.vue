<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代理用户" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入代理用户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机构ID" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入机构ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理人id" prop="agentId">
        <el-input
          v-model="queryParams.agentId"
          placeholder="请输入代理人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请号/专利号" prop="applyId">
        <el-input
          v-model="queryParams.applyId"
          placeholder="请输入申请号/专利号"
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
      <el-form-item label="专利申请人" prop="proposer">
        <el-input
          v-model="queryParams.proposer"
          placeholder="请输入专利申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专利申请日" prop="applyDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.applyDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择专利申请日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="专利类型 " prop="applyType">
        <el-select v-model="queryParams.applyType" placeholder="请选择专利类型 " clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="申请方式" prop="applyMode">
        <el-input
          v-model="queryParams.applyMode"
          placeholder="请输入申请方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专利案件状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入专利案件状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理机构" prop="agency">
        <el-input
          v-model="queryParams.agency"
          placeholder="请输入代理机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理人" prop="agentPerson">
        <el-input
          v-model="queryParams.agentPerson"
          placeholder="请输入代理人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内部编号" prop="insideCode">
        <el-input
          v-model="queryParams.insideCode"
          placeholder="请输入内部编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作人" prop="operator">
        <el-input
          v-model="queryParams.operator"
          placeholder="请输入操作人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发明人" prop="inventor">
        <el-input
          v-model="queryParams.inventor"
          placeholder="请输入发明人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="queryParams.description"
          placeholder="请输入描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机构代码" prop="agencyCode">
        <el-input
          v-model="queryParams.agencyCode"
          placeholder="请输入机构代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否出售" prop="isSell">
        <el-input
          v-model="queryParams.isSell"
          placeholder="请输入是否出售"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态 " prop="isDel">
        <el-input
          v-model="queryParams.isDel"
          placeholder="请输入状态 "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="该专利是否已经缴过费, 0代表不是, 1代表是, 默认为0" prop="isPay">
        <el-input
          v-model="queryParams.isPay"
          placeholder="请输入该专利是否已经缴过费, 0代表不是, 1代表是, 默认为0"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态 " prop="isDownload">
        <el-input
          v-model="queryParams.isDownload"
          placeholder="请输入状态 "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="1为今天待更新，更新为0" prop="todayUpdateState">
        <el-input
          v-model="queryParams.todayUpdateState"
          placeholder="请输入1为今天待更新，更新为0"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未知" prop="falskOrPri">
        <el-input
          v-model="queryParams.falskOrPri"
          placeholder="请输入未知"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="删除时间" prop="delTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.delTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择删除时间">
        </el-date-picker>
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
          v-hasPermi="['manager:applyInfo:add']"
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
          v-hasPermi="['manager:applyInfo:edit']"
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
          v-hasPermi="['manager:applyInfo:remove']"
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
          v-hasPermi="['manager:applyInfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="applyInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="专利详情ID" align="center" prop="applyInfoId" />
      <el-table-column label="代理用户" align="center" prop="userId" />
      <el-table-column label="机构ID" align="center" prop="parentId" />
      <el-table-column label="代理人id" align="center" prop="agentId" />
      <el-table-column label="申请号/专利号" align="center" prop="applyId" />
      <el-table-column label="专利名称" align="center" prop="applyName" />
      <el-table-column label="专利申请人" align="center" prop="proposer" />
      <el-table-column label="专利申请日" align="center" prop="applyDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专利类型 " align="center" prop="applyType" />
      <el-table-column label="申请方式" align="center" prop="applyMode" />
      <el-table-column label="专利案件状态" align="center" prop="state" />
      <el-table-column label="代理机构" align="center" prop="agency" />
      <el-table-column label="代理人" align="center" prop="agentPerson" />
      <el-table-column label="内部编号" align="center" prop="insideCode" />
      <el-table-column label="操作人" align="center" prop="operator" />
      <el-table-column label="发明人" align="center" prop="inventor" />
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="机构代码" align="center" prop="agencyCode" />
      <el-table-column label="是否出售" align="center" prop="isSell" />
      <el-table-column label="状态 " align="center" prop="isDel" />
      <el-table-column label="该专利是否已经缴过费, 0代表不是, 1代表是, 默认为0" align="center" prop="isPay" />
      <el-table-column label="状态 " align="center" prop="isDownload" />
      <el-table-column label="1为今天待更新，更新为0" align="center" prop="todayUpdateState" />
      <el-table-column label="未知" align="center" prop="falskOrPri" />
      <el-table-column label="删除时间" align="center" prop="delTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.delTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:applyInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:applyInfo:remove']"
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

    <!-- 添加或修改applyInfo对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="代理用户" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入代理用户" />
        </el-form-item>
        <el-form-item label="机构ID" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入机构ID" />
        </el-form-item>
        <el-form-item label="代理人id" prop="agentId">
          <el-input v-model="form.agentId" placeholder="请输入代理人id" />
        </el-form-item>
        <el-form-item label="申请号/专利号" prop="applyId">
          <el-input v-model="form.applyId" placeholder="请输入申请号/专利号" />
        </el-form-item>
        <el-form-item label="专利名称" prop="applyName">
          <el-input v-model="form.applyName" placeholder="请输入专利名称" />
        </el-form-item>
        <el-form-item label="专利申请人" prop="proposer">
          <el-input v-model="form.proposer" placeholder="请输入专利申请人" />
        </el-form-item>
        <el-form-item label="专利申请日" prop="applyDate">
          <el-date-picker clearable size="small"
            v-model="form.applyDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择专利申请日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="专利类型 " prop="applyType">
          <el-select v-model="form.applyType" placeholder="请选择专利类型 ">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请方式" prop="applyMode">
          <el-input v-model="form.applyMode" placeholder="请输入申请方式" />
        </el-form-item>
        <el-form-item label="专利案件状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入专利案件状态" />
        </el-form-item>
        <el-form-item label="代理机构" prop="agency">
          <el-input v-model="form.agency" placeholder="请输入代理机构" />
        </el-form-item>
        <el-form-item label="代理人" prop="agentPerson">
          <el-input v-model="form.agentPerson" placeholder="请输入代理人" />
        </el-form-item>
        <el-form-item label="内部编号" prop="insideCode">
          <el-input v-model="form.insideCode" placeholder="请输入内部编号" />
        </el-form-item>
        <el-form-item label="操作人" prop="operator">
          <el-input v-model="form.operator" placeholder="请输入操作人" />
        </el-form-item>
        <el-form-item label="发明人" prop="inventor">
          <el-input v-model="form.inventor" placeholder="请输入发明人" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="机构代码" prop="agencyCode">
          <el-input v-model="form.agencyCode" placeholder="请输入机构代码" />
        </el-form-item>
        <el-form-item label="是否出售" prop="isSell">
          <el-input v-model="form.isSell" placeholder="请输入是否出售" />
        </el-form-item>
        <el-form-item label="状态 " prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入状态 " />
        </el-form-item>
        <el-form-item label="该专利是否已经缴过费, 0代表不是, 1代表是, 默认为0" prop="isPay">
          <el-input v-model="form.isPay" placeholder="请输入该专利是否已经缴过费, 0代表不是, 1代表是, 默认为0" />
        </el-form-item>
        <el-form-item label="状态 " prop="isDownload">
          <el-input v-model="form.isDownload" placeholder="请输入状态 " />
        </el-form-item>
        <el-form-item label="1为今天待更新，更新为0" prop="todayUpdateState">
          <el-input v-model="form.todayUpdateState" placeholder="请输入1为今天待更新，更新为0" />
        </el-form-item>
        <el-form-item label="未知" prop="falskOrPri">
          <el-input v-model="form.falskOrPri" placeholder="请输入未知" />
        </el-form-item>
        <el-form-item label="删除时间" prop="delTime">
          <el-date-picker clearable size="small"
            v-model="form.delTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择删除时间">
          </el-date-picker>
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
import { listApplyInfo, getApplyInfo, delApplyInfo, addApplyInfo, updateApplyInfo, exportApplyInfo } from "@/api/manager/applyInfo";

export default {
  name: "ApplyInfo",
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
      // applyInfo表格数据
      applyInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        parentId: null,
        agentId: null,
        applyId: null,
        applyName: null,
        proposer: null,
        applyDate: null,
        applyType: null,
        applyMode: null,
        state: null,
        agency: null,
        agentPerson: null,
        insideCode: null,
        operator: null,
        inventor: null,
        description: null,
        agencyCode: null,
        isSell: null,
        isDel: null,
        isPay: null,
        isDownload: null,
        todayUpdateState: null,
        falskOrPri: null,
        delTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        isPay: [
          { required: true, message: "该专利是否已经缴过费, 0代表不是, 1代表是, 默认为0不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询applyInfo列表 */
    getList() {
      this.loading = true;
      listApplyInfo(this.queryParams).then(response => {
        this.applyInfoList = response.rows;
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
        applyInfoId: null,
        userId: null,
        parentId: null,
        agentId: null,
        applyId: null,
        applyName: null,
        proposer: null,
        applyDate: null,
        applyType: null,
        applyMode: null,
        state: null,
        agency: null,
        agentPerson: null,
        insideCode: null,
        operator: null,
        inventor: null,
        description: null,
        agencyCode: null,
        isSell: null,
        isDel: null,
        isPay: null,
        isDownload: null,
        todayUpdateState: null,
        falskOrPri: null,
        delTime: null,
        updateTime: null,
        createTime: null
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
      this.ids = selection.map(item => item.applyInfoId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加applyInfo";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const applyInfoId = row.applyInfoId || this.ids
      getApplyInfo(applyInfoId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改applyInfo";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.applyInfoId != null) {
            updateApplyInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApplyInfo(this.form).then(response => {
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
      const applyInfoIds = row.applyInfoId || this.ids;
      this.$confirm('是否确认删除applyInfo编号为"' + applyInfoIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delApplyInfo(applyInfoIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有applyInfo数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportApplyInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
