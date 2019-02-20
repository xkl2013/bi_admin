import React from "react";
// import { FormattedMessage } from 'umi/locale';
import { Link } from "dva/router";
import PageHeader from "@/components/PageHeader";
import { connect } from "dva";
import GridContent from "./GridContent";
import styles from "./index.less";
import MenuContext from "@/layout/MenuContext";

const PageHeaderWrapper = ({
  children,
  contentWidth,
  wrapperClassName,
  top,
  ...restProps
}) => (
  <div style={{ margin: "-24px -24px 0" }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === "Fixed"}
          home="home"
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          // itemRender={item => {
          //   if (item.locale) {
          //     // return <FormattedMessage id={item.locale} defaultMessage={item.title} />;
          //   }
          //   return item.title;
          // }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth
}))(PageHeaderWrapper);
